import { ObjectId } from 'mongodb';
import { MongodbSharingGroupModel } from 'src/server/adapters/mongodb/sharing_group/model/MongodbSharingGroupModel';
import { ScriptOptionsType } from 'src/server/scripts/helpers/scriptOptions';

export async function getOrCreateSharingGroupForCrew(
  crewName: string,
  { isDryRun }: ScriptOptionsType,
): Promise<ObjectId | undefined> {
  const sharingGroup = await MongodbSharingGroupModel.findOne({
    name: crewName,
  });
  if (sharingGroup == null) {
    console.log(
      `[${
        isDryRun ? 'DRY RUN' : 'LIVE RUN'
      }] Creating a new sharing group for crew "${crewName}"`,
    );
    if (!isDryRun) {
      const saved = await new MongodbSharingGroupModel({
        name: crewName,
      }).save();
      return saved._id;
    }
  } else {
    return sharingGroup._id;
  }
}
