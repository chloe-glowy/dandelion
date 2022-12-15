import { ObjectId } from 'mongodb';
import type { Document } from 'mongoose';
import { MongodbAidRequestRecord } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import forEachAidRequest from 'src/server/scripts/helpers/for-each-aid-request';
import { ScriptOptionsType } from 'src/server/scripts/helpers/scriptOptions';
import { updateAidRequestForScript } from 'src/server/scripts/helpers/update-aid-request';

export async function setSharingGroupIDsInAidRequests(
  crewNameToSharingGroupID: Map<string, ObjectId>,
  { isDryRun }: ScriptOptionsType,
): Promise<void> {
  await forEachAidRequest(async (aidRequest): Promise<void> => {
    if (aidRequest.sharingGroup != null) {
      return;
    }
    const crew = aidRequest.crew;
    if (crew == null) {
      return;
    }
    const summary = `${aidRequest.whatIsNeeded} for ${aidRequest.whoIsItFor} (crew ${crew})`;
    const sharingGroupID = crewNameToSharingGroupID.get(crew);
    if (sharingGroupID == null) {
      if (isDryRun) {
        console.log(`[DRY RUN] Need to add sharing group ID for ${summary}`);
        return;
      } else {
        throw new Error('No sharing group ID found for crew ' + crew);
      }
    }
    console.log(
      `Updating ${summary}: Sharing group = ${sharingGroupID.toString()}`,
    );
    await updateAidRequestForScript(
      aidRequest as unknown as Document<MongodbAidRequestRecord>,
      { sharingGroup: new ObjectId(sharingGroupID.toString()) },
      { isDryRun, logOnChange: true },
    );
  });
}
