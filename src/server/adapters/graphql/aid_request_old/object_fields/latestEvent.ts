import type { ObjectTypeComposerFieldConfigAsObjectDefinition } from 'graphql-compose';
import type { MongodbAidRequest } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type {
  AidRequestActionType,
  AidRequestHistoryEventType,
} from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import getWhoRecordedRequest from 'src/server/adapters/mongodb/collections/aid_request/helpers/getWhoRecordedRequest';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import loadAidRequestForViewer from 'src/server/adapters/mongodb/collections/aid_request/helpers/loadAidRequestForViewer';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { UserModel } from 'src/server/adapters/mongodb/collections/user/UserModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import ago from 'src/shared/presenter_utils/ago';

const latestEvent: ObjectTypeComposerFieldConfigAsObjectDefinition<
  MongodbAidRequest,
  Express.Request,
  Record<string, never>
> = {
  resolve: async (
    { _id: aidRequestID }: MongodbAidRequest,
    _args: Record<string, never>,
    req: Express.Request,
  ): Promise<string> => {
    const viewer = assertLoggedIn(req, 'AidRequest.latestEvent');
    const aidRequest = await loadAidRequestForViewer(viewer, aidRequestID);
    const { history } = aidRequest;
    if (history.length === 0) {
      const recorder = await getWhoRecordedRequest(aidRequest);
      return `${ago(aidRequest.createdAt)} - ${
        recorder?.displayName ?? 'Unknown'
      } recorded this`;
    }
    const event = history.reduce((latestEvent, currentEvent) =>
      currentEvent.timestamp > latestEvent.timestamp
        ? currentEvent
        : latestEvent,
    );
    const actor = await UserModel.findById(event.actor);
    if (actor == null) {
      throw new Error('Action must have actor');
    }
    const actorIsViewer = actor._id.equals(viewer._id);
    return `${ago(event.timestamp)} - ${
      actorIsViewer ? 'You' : actor.displayName
    } ${getActionText(event.event, event.action)}`;
  },
  type: 'String!',
};

function getActionText(
  event: AidRequestHistoryEventType,
  action: AidRequestActionType,
): string {
  switch (action) {
    case 'Add':
      return (() => {
        switch (event) {
          case 'WorkingOn':
            return 'started working on it';
          case 'Completed':
            return 'completed this';
          case 'Created':
            return 'recorded this';
          case 'Deleted':
            return 'deleted this';
          case 'Comment':
            return 'commented';
          case 'ChangedWhatIsNeeded':
          case 'ChangedWhoIsItFor':
            return 'edited';
        }
      })();
    case 'Remove':
      return (() => {
        switch (event) {
          case 'WorkingOn':
            return 'stopped working on it';
          case 'Completed':
            return 'marked as incomplete';
          case 'Created':
            return 'un-created this';
          case 'Deleted':
            return 'un-deleted this';
          case 'Comment':
            return 'un-commented';
          case 'ChangedWhatIsNeeded':
          case 'ChangedWhoIsItFor':
            return 'un-edited';
        }
      })();
  }
}

export default latestEvent;
