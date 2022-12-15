import type { ObjectTypeComposerFieldConfigAsObjectDefinition } from 'graphql-compose';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { ObjectId } from 'mongodb';
import type { MongodbAidRequest } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type { AidRequestActionOption } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import loadAidRequestForViewer from 'src/server/adapters/mongodb/collections/aid_request/helpers/loadAidRequestForViewer';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';

const actionsAvailable: ObjectTypeComposerFieldConfigAsObjectDefinition<
  MongodbAidRequest,
  Express.Request,
  Record<string, never>
> = {
  resolve: async (
    { _id: aidRequestID }: MongodbAidRequest,
    _args: Record<string, never>,
    req: Express.Request,
  ): Promise<Array<AidRequestActionOption>> => {
    const user = assertLoggedIn(req, 'AidRequest.actionsAvailable');
    const aidRequest = await loadAidRequestForViewer(user, aidRequestID);
    const isCreator = new ObjectId(aidRequest.whoRecordedIt).equals(user._id);
    const options: Array<AidRequestActionOption> = [
      aidRequest.completed
        ? markAsNotCompletedOption()
        : markAsCompletedOption(),
      aidRequest.whoIsWorkingOnIt.includes(user._id)
        ? iAmNotWorkingOnItOption()
        : iAmWorkingOnItOption(),
      ...(isCreator ? [deleteOption()] : []),
    ];
    return options;
  },
  type: '[AidRequestActionOption]',
};

function markAsNotCompletedOption(): AidRequestActionOption {
  return {
    icon: 'uncheck',
    input: {
      action: 'Remove',
      event: 'Completed',
    },
    message: 'Mark as incomplete',
  };
}

function markAsCompletedOption(): AidRequestActionOption {
  return {
    icon: 'check',
    input: {
      action: 'Add',
      event: 'Completed',
    },
    message: 'Mark as complete',
  };
}

function iAmWorkingOnItOption(): AidRequestActionOption {
  return {
    icon: 'raised-hand',
    input: {
      action: 'Add',
      event: 'WorkingOn',
    },
    message: "I'm working on it",
  };
}

function iAmNotWorkingOnItOption(): AidRequestActionOption {
  return {
    icon: 'x',
    input: {
      action: 'Remove',
      event: 'WorkingOn',
    },
    message: "I'm not working on it",
  };
}

function deleteOption(): AidRequestActionOption {
  return {
    icon: 'delete',
    input: {
      action: 'Add',
      event: 'Deleted',
    },
    message: 'Delete',
  };
}

export default actionsAvailable;
