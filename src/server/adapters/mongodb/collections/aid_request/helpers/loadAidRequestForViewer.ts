import { MongodbAidRequestModel } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModel';
import { MongodbAidRequest } from 'src/server/adapters/mongodb/aid_request/types/MongodbAidRequest';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import analytics from 'src/server/deprecated/analytics';

/**
 * @deprecated Use AidRequestLoader
 */
export default async function loadAidRequestForViewer(
  viewer: Express.User,
  aidRequestID: string | undefined,
): Promise<MongodbAidRequest> {
  let result: MongodbAidRequest | Error | undefined;
  try {
    result = await loadAidRequestForViewerImpl(viewer, aidRequestID);
  } catch (e) {
    result = new Error(NON_PERMISSION_ERROR_MESSAGE);
  }
  if (!(result instanceof Error)) {
    return result;
  }
  const error = result;
  analytics.track({
    event: 'Loading aid request failed',
    properties: {
      aidRequestID: aidRequestID ?? 'undefined',
      message: error.message,
    },
    user: viewer,
  });
  throw error;
}

/**
 * @deprecated Use AidRequestLoader
 */
export async function maybeLoadAidRequestForViewer(
  viewer: Express.User,
  aidRequestID: string | undefined,
): Promise<MongodbAidRequest | undefined> {
  const result = await loadAidRequestForViewerImpl(viewer, aidRequestID);
  return result instanceof Error ? undefined : result;
}

/**
 * @deprecated Use AidRequestLoader
 */
async function loadAidRequestForViewerImpl(
  user: Express.User,
  aidRequestID: string | undefined,
): Promise<MongodbAidRequest | Error> {
  const aidRequest = await MongodbAidRequestModel.findById(aidRequestID);
  if (aidRequest == null) {
    console.error(
      'Error in loadAidRequestForViewerImpl ' +
        JSON.stringify({ aidRequestID, userID: user._id.toString() }),
    );
    return new Error(NON_PERMISSION_ERROR_MESSAGE);
  }
  if (!user.sharingGroups.includes(aidRequest.sharingGroup)) {
    return new Error(PERMISSION_ERROR_MESSAGE);
  }
  return aidRequest;
}

const NON_PERMISSION_ERROR_MESSAGE =
  'Unable to load aid request. The link you followed may be invalid or our server may be experiencing an issue.';
const PERMISSION_ERROR_MESSAGE =
  "You don't have permission to see this aid request";
