import { aidRequest2 } from 'src/server/adapters/graphql/aid_request2/aidRequest2';
import { AidRequestGraphQLType } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
import createAidRequests from 'src/server/adapters/graphql/aid_request_old/mutations/createAidRequests';
import editAidRequest from 'src/server/adapters/graphql/aid_request_old/mutations/editAidRequest';
import actionsAvailable from 'src/server/adapters/graphql/aid_request_old/object_fields/actionsAvailable';
import activity from 'src/server/adapters/graphql/aid_request_old/object_fields/activity';
import completed from 'src/server/adapters/graphql/aid_request_old/object_fields/completed';
import createdAt from 'src/server/adapters/graphql/aid_request_old/object_fields/createdAt';
import lastUpdated from 'src/server/adapters/graphql/aid_request_old/object_fields/lastUpdated';
import latestEvent from 'src/server/adapters/graphql/aid_request_old/object_fields/latestEvent';
import sharingGroup from 'src/server/adapters/graphql/aid_request_old/object_fields/sharingGroup';
import status from 'src/server/adapters/graphql/aid_request_old/object_fields/status';
import whatIsNeeded from 'src/server/adapters/graphql/aid_request_old/object_fields/whatIsNeeded';
import whoIsItFor from 'src/server/adapters/graphql/aid_request_old/object_fields/whoIsItFor';
import whoIsWorkingOnItUsers from 'src/server/adapters/graphql/aid_request_old/object_fields/whoIsWorkingOnItUsers';
import whoRecordedIt from 'src/server/adapters/graphql/aid_request_old/object_fields/whoRecordedIt';
import _id from 'src/server/adapters/graphql/aid_request_old/object_fields/_id';
import aidRequest from 'src/server/adapters/graphql/aid_request_old/query_fields/aidRequest';
import allAidRequests from 'src/server/adapters/graphql/aid_request_old/query_fields/allAidRequests/allAidRequests';
import { allAidRequests2 } from 'src/server/adapters/graphql/all_aid_requests/allAidRequests2';
import { createAidRequests2 } from 'src/server/adapters/graphql/create_aid_requests/createAidRequests2';
import { editAidRequest2 } from 'src/server/adapters/graphql/edit_aid_request/editAidRequest2';
import { undoAidRequestEdit } from 'src/server/adapters/graphql/undo_aid_request_edit/GraphQLUndoAidRequestEditMutation';

AidRequestGraphQLType.addFields({
  _id,
  actionsAvailable,
  activity,
  completed,
  createdAt,
  lastUpdated,
  latestEvent,
  sharingGroup,
  status,
  whatIsNeeded,
  whoIsItFor,
  whoIsWorkingOnItUsers,
  whoRecordedIt,
});

const AidRequest = {
  MutationFields: {
    createAidRequests,
    createAidRequests2,
    editAidRequest,
    editAidRequest2,
    undoAidRequestEdit,
  },
  QueryFields: {
    aidRequest,
    aidRequest2,
    allAidRequests,
    allAidRequests2,
  },
};

export default AidRequest;
