import type { MongodbAidRequest } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
import forEachAidRequest from 'src/server/scripts/helpers/for-each-aid-request';
import type { ScriptOptionsType } from 'src/server/scripts/helpers/scriptOptions';
import { updateComputedFields } from 'src/server/scripts/updateComputedFields';

async function processOneAidRequest(
  aidRequest: MongodbAidRequest,
  { isDryRun }: ScriptOptionsType,
): Promise<void> {
  console.log('Processing', aidRequest._id.toString());
  await updateComputedFields(aidRequest, { isDryRun, logOnChange: true });
}

forEachAidRequest(processOneAidRequest).then((returnValue: number) => {
  process.exit(returnValue);
});
