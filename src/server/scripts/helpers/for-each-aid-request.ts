import type { MongodbAidRequest } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
import { MongodbAidRequestModel } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModel';
import { initScriptEnvironment } from 'src/server/scripts/helpers/initScriptEnvironment';
import {
  getScriptOptions,
  ScriptOptionsType,
} from 'src/server/scripts/helpers/scriptOptions';

initScriptEnvironment();

type Handler = (
  aidRequest: MongodbAidRequest,
  options: ScriptOptionsType,
) => Promise<void>;

export default async function forEachAidRequest(
  handler: Handler,
): Promise<number> {
  const aidRequests = await MongodbAidRequestModel.find();
  const options = getScriptOptions();
  for (let i = 0; i < aidRequests.length; i++) {
    const aidRequest = aidRequests[i];
    await handler(aidRequest, options);
  }
  return 0;
}
