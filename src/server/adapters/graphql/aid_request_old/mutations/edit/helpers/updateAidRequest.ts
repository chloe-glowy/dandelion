// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type { UpdateQuery } from 'mongoose';
import type { MongodbAidRequest } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { MongodbAidRequestModel } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type { MongodbAidRequestRecord } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';

/**
 * @deprecated Use AidRequest class instead
 */
export default async function updateAidRequest(
  aidRequestID: string,
  updater: UpdateQuery<MongodbAidRequestRecord>,
): Promise<MongodbAidRequest> {
  const aidRequest = await MongodbAidRequestModel.findByIdAndUpdate(
    aidRequestID,
    updater,
    {
      new: true,
    },
  );

  if (aidRequest == null) {
    throw new Error('Update failed');
  }

  return aidRequest;
}
