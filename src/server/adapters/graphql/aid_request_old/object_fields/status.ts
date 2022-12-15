import type { ObjectTypeComposerFieldConfigAsObjectDefinition } from 'graphql-compose';
import { schemaComposer } from 'graphql-compose';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type { ObjectId } from 'mongodb';
import type { MongodbAidRequest } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import loadAidRequestForViewer from 'src/server/adapters/mongodb/collections/aid_request/helpers/loadAidRequestForViewer';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import {
  maybeLoadMany,
  maybeLoadUserForViewer,
} from 'src/server/adapters/mongodb/collections/user/loader/loadUserForViewer';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { Person } from 'src/server/adapters/mongodb/collections/user/UserGraphQLTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';

type StatusSummary = {
  message: string;
  people: Person[];
};

export const StatusSummaryGraphQLType = schemaComposer.createObjectTC({
  fields: {
    message: 'String!',
    people: '[Person!]!',
  },
  name: 'StatusSummary',
});

const status: ObjectTypeComposerFieldConfigAsObjectDefinition<
  MongodbAidRequest,
  Express.Request,
  Record<string, never>
> = {
  resolve: async (
    { _id: aidRequestID }: MongodbAidRequest,
    _args: Record<string, never>,
    req: Express.Request,
  ): Promise<StatusSummary> => {
    const viewer = assertLoggedIn(req, 'AidRequest.status');
    const aidRequest = await loadAidRequestForViewer(viewer, aidRequestID);
    if (aidRequest.completed) {
      return await completedStatus(viewer, aidRequest);
    }

    const { whoIsWorkingOnIt } = aidRequest;
    if (whoIsWorkingOnIt.length > 0) {
      return await workingOnItStatus(viewer, aidRequest, whoIsWorkingOnIt);
    }

    return {
      message: 'No one is working on it yet',
      people: [],
    };
  },
  type: 'StatusSummary!',
};

async function completedStatus(
  viewer: Express.User,
  aidRequest: MongodbAidRequest,
): Promise<StatusSummary> {
  const completer = await getWhoCompletedThis(viewer, aidRequest);
  if (completer == null) {
    return {
      message: 'Completed',
      people: [],
    };
  } else {
    return {
      message: `Completed by ${completer.displayName}`,
      people: [completer],
    };
  }
}

async function getWhoCompletedThis(
  user: Express.User,
  aidRequest: MongodbAidRequest,
): Promise<Person | null> {
  const { history } = aidRequest;
  for (let i = history.length - 1; i >= 0; i--) {
    const event = history[i];
    if (event.event === 'Completed' && event.action === 'Add') {
      return await maybeLoadUserForViewer(user, event.actor.toString());
    }
  }
  return null;
}

async function workingOnItStatus(
  viewer: Express.User,
  aidRequest: MongodbAidRequest,
  whoIsWorkingOnIt: ObjectId[],
): Promise<StatusSummary> {
  const people = await maybeLoadMany(viewer, whoIsWorkingOnIt);
  switch (people.length) {
    case 0:
      return {
        message: 'Someone is working on it',
        people,
      };
    case 1:
      return {
        message: `${people[0].displayName} is working on it`,
        people,
      };
    case 2:
      return {
        message: `${people[0].displayName} and ${people[1].displayName} are working on it`,
        people,
      };
    default:
      return {
        message: `${people.length} people are working on it`,
        people,
      };
  }
}

export default status;
