import type { MongodbAidRequestRecord } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import { UserModel } from 'src/server/adapters/mongodb/collections/user/UserModel';

export default async function getWhoRecordedRequest(
  aidRequest: MongodbAidRequestRecord,
): Promise<Express.User | null> {
  const { whoRecordedIt, whoRecordedItUsername } = aidRequest;
  if (whoRecordedIt != null) {
    return await UserModel.findById(whoRecordedIt);
  } else {
    return await UserModel.findOne({ username: whoRecordedItUsername });
  }
}
