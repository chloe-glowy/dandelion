import { ObjectId } from 'mongodb';
import type { Document } from 'mongoose';
import crew from 'src/server/adapters/graphql/aid_request_old/object_fields/sharingGroup';
import { UserType } from 'src/server/adapters/mongodb/collections/user/UserModel';
import forEachUser from 'src/server/scripts/helpers/for-each-user';
import { ScriptOptionsType } from 'src/server/scripts/helpers/scriptOptions';
import { updateUserForScript } from 'src/server/scripts/helpers/update-user';

export async function setSharingGroupIDsInUsers(
  crewNameToSharingGroupID: Map<string, ObjectId>,
  { isDryRun }: ScriptOptionsType,
): Promise<void> {
  await forEachUser(async (user): Promise<void> => {
    const crews = user.crews;
    const summary = `${user.displayName} (crews ${crews.join(', ')})`;
    const sharingGroups = crews.map((crew) =>
      crewNameToSharingGroupID.get(crew),
    );
    if (sharingGroups.length !== crews.length) {
      if (isDryRun) {
        console.log(`[DRY RUN] Need to add sharing group ID for ${summary}`);
        return;
      } else {
        throw new Error('No sharing group ID found for crew ' + crew);
      }
    }
    if (sharingGroups.every((s, i) => s?.equals(user.sharingGroups[i]))) {
      return;
    }
    console.log(
      `Updating ${summary}: Sharing groups = ${sharingGroups
        .map((s) => (s === undefined ? 'undefined' : s.toString()))
        .join(',')}`,
    );
    await updateUserForScript(
      user as unknown as Document<UserType>,
      { sharingGroups },
      { isDryRun, logOnChange: true },
    );
  });
}
