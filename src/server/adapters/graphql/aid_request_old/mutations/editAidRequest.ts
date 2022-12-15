import {
  AidRequestActionInputInputType,
  AidRequestHistoryEventGraphQLType,
  MongodbAidRequest,
} from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
import changeWhatIsNeeded from 'src/server/adapters/graphql/aid_request_old/mutations/edit/executors/changeWhatIsNeeded';
import changeWhoIsItFor from 'src/server/adapters/graphql/aid_request_old/mutations/edit/executors/changeWhoIsItFor';
import comment from 'src/server/adapters/graphql/aid_request_old/mutations/edit/executors/comment';
import complete from 'src/server/adapters/graphql/aid_request_old/mutations/edit/executors/complete';
import delete_ from 'src/server/adapters/graphql/aid_request_old/mutations/edit/executors/delete';
import workingOn from 'src/server/adapters/graphql/aid_request_old/mutations/edit/executors/workingOn';
import updateAidRequest from 'src/server/adapters/graphql/aid_request_old/mutations/edit/helpers/updateAidRequest';
import {
  GraphQLAidRequestUpdateArgs,
  GraphQLAidRequestUpdateResult,
} from 'src/server/adapters/graphql/aid_request_old/mutations/edit/UpdateType';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type {
  AidRequestActionInput,
  AidRequestHistoryEventForGraphQL,
} from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import getComputedFields from 'src/server/adapters/mongodb/collections/aid_request/computed_fields/getComputedFields';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import loadAidRequestForViewer from 'src/server/adapters/mongodb/collections/aid_request/helpers/loadAidRequestForViewer';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import analytics from 'src/server/deprecated/analytics';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';

async function editAidRequestResolver(
  _: unknown,
  {
    aidRequestID,
    input,
    undoID,
  }: {
    aidRequestID: string;
    input: AidRequestActionInput;
    undoID: string | null;
  },
  req: Express.Request,
): Promise<AidRequestHistoryEventForGraphQL | null> {
  const user = assertLoggedIn(req, 'editAidRequest');
  const originalAidRequest = await loadAidRequestForViewer(user, aidRequestID);
  const whatIsNeeded = originalAidRequest?.whatIsNeeded ?? '';
  const whoIsItFor = originalAidRequest?.whoIsItFor ?? '';
  const requestSharingGroupID = originalAidRequest?.sharingGroup;
  const {
    postpublishSummary,
    aidRequest: updatedAidRequest,
    historyEvent,
  } = await executeUpdate({
    aidRequestID,
    input,
    originalAidRequest,
    req,
    undoID,
    user,
  });
  let aidRequest: MongodbAidRequest | null = updatedAidRequest;
  if (aidRequest != null) {
    const computedFields = await getComputedFields(aidRequest);
    aidRequest = await updateAidRequest(aidRequestID, computedFields);
  }
  analytics.track({
    event: 'Edited Aid Request',
    properties: {
      action: input.action,
      aidRequestID,
      canUndo: historyEvent.undoID != null ? 'true' : 'false',
      event: input.event,
      isUndo: undoID != null ? 'true' : 'false',
      postpublishSummary,
      requestSharingGroupID: requestSharingGroupID.toString(),
      whatIsNeeded,
      whoIsItFor,
    },
    user,
  });
  return {
    ...historyEvent,
    actor: async () => user,
    aidRequest: async () => aidRequest,
    postpublishSummary,
  };
}

const editAidRequest = {
  args: {
    aidRequestID: 'String!',
    input: AidRequestActionInputInputType,
    undoID: 'String',
  },
  resolve: editAidRequestResolver,
  type: AidRequestHistoryEventGraphQLType,
};

export default editAidRequest;

async function executeUpdate(
  args: GraphQLAidRequestUpdateArgs,
): Promise<GraphQLAidRequestUpdateResult> {
  switch (args.input.event) {
    case 'Created':
      throw new Error('Cannot create an aid request through editAidRequest');
    case 'WorkingOn':
      return await workingOn(args);
    case 'Completed':
      return await complete(args);
    case 'Deleted':
      return await delete_(args);
    case 'Comment':
      return await comment(args);
    case 'ChangedWhatIsNeeded':
      return await changeWhatIsNeeded(args);
    case 'ChangedWhoIsItFor':
      return await changeWhoIsItFor(args);
  }
}
