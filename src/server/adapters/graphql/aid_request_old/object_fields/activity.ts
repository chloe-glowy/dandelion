import type { ObjectTypeComposerFieldConfigAsObjectDefinition } from 'graphql-compose';
import type {
  AidRequestActivityItem,
  MongodbAidRequest,
} from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { MongodbAidRequestHistoryEvent } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import getHistoryEventSummary from 'src/server/adapters/mongodb/collections/aid_request/helpers/getHistoryEventSummary';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import loadAidRequestForViewer from 'src/server/adapters/mongodb/collections/aid_request/helpers/loadAidRequestForViewer';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import loadUserForViewer from 'src/server/adapters/mongodb/collections/user/loader/loadUserForViewer';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import ago from 'src/shared/presenter_utils/ago';

type ReturnType = AidRequestActivityItem[];
const GraphQLType = '[AidRequestActivityItem!]!';

/**
 * @deprecated Use the `activity` field on GraphQLAidRequestProxy
 */
const history: ObjectTypeComposerFieldConfigAsObjectDefinition<
  MongodbAidRequest,
  Express.Request,
  Record<string, never>
> = {
  resolve: async (
    { _id: aidRequestID }: MongodbAidRequest,
    _args: Record<string, never>,
    req: Express.Request,
  ): Promise<ReturnType> => {
    const viewer = assertLoggedIn(req, 'AidRequest.history');
    const aidRequest = await loadAidRequestForViewer(viewer, aidRequestID);
    return aidRequest.history
      .sort((a, b) => b.timestamp.valueOf() - a.timestamp.valueOf())
      .map(
        (event: MongodbAidRequestHistoryEvent): AidRequestActivityItem => ({
          _id: (event as unknown as { _id: string })._id,
          actor: async (): Promise<Express.User | null> => {
            return await loadUserForViewer(viewer, event.actor.toString());
          },
          isComment: event.event === 'Comment',
          message: async (): Promise<string> =>
            await getHistoryEventSummary(viewer, event),
          when: ago(event.timestamp),
        }),
      );
  },
  type: GraphQLType,
};

export default history;
