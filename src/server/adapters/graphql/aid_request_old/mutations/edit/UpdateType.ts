import type { MongodbAidRequest } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type {
  AidRequestActionInput,
  MongodbAidRequestHistoryEvent,
} from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';

export type GraphQLAidRequestUpdateResult = {
  aidRequest: MongodbAidRequest | null;
  postpublishSummary: string;
  historyEvent: MongodbAidRequestHistoryEvent;
};

export type GraphQLAidRequestUpdateArgs = {
  aidRequestID: string;
  input: AidRequestActionInput;
  originalAidRequest: MongodbAidRequest;
  req: Express.Request;
  undoID: string | null;
  user: Express.User;
};
