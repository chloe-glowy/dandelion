import type { MongodbAidRequest } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
import type { MongodbAidRequestHistoryEvent } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';

export type NotifyArgs = {
  aidRequest: MongodbAidRequest;
  comment: MongodbAidRequestHistoryEvent;
  commenter: Express.User;
  type: 'NewComment';
  req: Express.Request;
};

export type NotifySpecificRecipientArgs = NotifyArgs & {
  extraRecipientIDs?: Array<string>;
  recipient: Express.User;
};
