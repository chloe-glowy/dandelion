import type { ObjectId } from 'mongodb';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type { MongodbSharingGroup } from 'src/server/adapters/graphql/sharing_group_old/SharingGroupGraphQLTypes';
import { MongodbSharingGroupModel } from 'src/server/adapters/mongodb/sharing_group/model/MongodbSharingGroupModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import analytics from 'src/server/deprecated/analytics';

/**
 * @deprecated This should be handled in SharingGroupLoader
 */
export async function loadSharingGroupForViewer(
  viewer: Express.User,
  sharingGroupID: ObjectId,
): Promise<MongodbSharingGroup> {
  let result: MongodbSharingGroup | Error | undefined;
  try {
    result = await loadSharingGroupForViewerImpl(viewer, sharingGroupID);
  } catch (e) {
    result = new Error(NON_PERMISSION_ERROR_MESSAGE);
  }
  if (!(result instanceof Error)) {
    return result;
  }
  const error = result;
  analytics.track({
    event: 'Loading sharing group failed',
    properties: {
      message: error.message,
      sharingGroupID: sharingGroupID.toString() ?? 'undefined',
    },
    user: viewer,
  });
  throw error;
}

/**
 * @deprecated This should be handled in SharingGroupLoader
 */
export async function maybeLoadSharingGroupForViewer(
  viewer: Express.User,
  sharingGroupID: ObjectId,
): Promise<MongodbSharingGroup | undefined> {
  const result = await loadSharingGroupForViewerImpl(viewer, sharingGroupID);
  return result instanceof Error ? undefined : result;
}

/**
 * @deprecated This should be handled in SharingGroupLoader
 */
async function loadSharingGroupForViewerImpl(
  user: Express.User,
  sharingGroupID: ObjectId,
): Promise<MongodbSharingGroup | Error> {
  const sharingGroup = await MongodbSharingGroupModel.findById(sharingGroupID);
  if (sharingGroup == null) {
    console.error(
      'Error in loadSharingGroupForViewerImpl ' +
        JSON.stringify({ sharingGroupID, userID: user._id.toString() }),
    );
    return new Error(NON_PERMISSION_ERROR_MESSAGE);
  }
  if (
    !user.sharingGroups.some((sharingGroupID) =>
      sharingGroupID.equals(sharingGroup._id),
    )
  ) {
    return new Error(PERMISSION_ERROR_MESSAGE);
  }
  return sharingGroup;
}

const NON_PERMISSION_ERROR_MESSAGE =
  'Unable to load sharing group. The link you followed may be invalid or our server may be experiencing an issue.';
const PERMISSION_ERROR_MESSAGE =
  "You don't have permission to see this sharing group";
