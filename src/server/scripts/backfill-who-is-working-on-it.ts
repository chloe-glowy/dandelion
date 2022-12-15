import type { MongodbAidRequest } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
import { MongodbAidRequestModel } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModel';
import forEachAidRequest from 'src/server/scripts/helpers/for-each-aid-request';

async function processOneAidRequest(
  aidRequest: MongodbAidRequest,
): Promise<void> {
  if (
    aidRequest.whoIsWorkingOnIt == null ||
    aidRequest.whoIsWorkingOnIt.length === 0
  ) {
    await MongodbAidRequestModel.findByIdAndUpdate(aidRequest._id, {
      whoIsWorkingOnIt: [],
    });
  }
}

forEachAidRequest(processOneAidRequest).then((returnValue: number) => {
  process.exit(returnValue);
});
