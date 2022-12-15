import { schemaComposer } from 'graphql-compose';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { composeWithMongoose } from 'graphql-compose-mongoose';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { Document } from 'mongoose';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { MongodbAidRequestModel } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type { MongodbAidRequestRecord } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { Person } from 'src/server/adapters/mongodb/collections/user/UserGraphQLTypes';

export type MongodbAidRequest = Document<
  unknown,
  unknown,
  MongodbAidRequestRecord
> &
  MongodbAidRequestRecord;

export const AidRequestGraphQLType = composeWithMongoose<
  MongodbAidRequest,
  Express.Request
>(MongodbAidRequestModel, {
  fields: {
    only: [
      // Fields must be explicitly defined with a resolver that
      // runs a privacy check. See AidRequestGraphQLImpl for a
      // list of fields.
    ],
  },
});

export type AidRequestEdge = {
  node: MongodbAidRequest;
};

export type AidRequestConnectionType = {
  edges: Array<AidRequestEdge>;
  pageInfo: {
    endCursor: string | null;
    hasNextPage: boolean;
  };
};

export const PageInfoGraphQLType =
  AidRequestGraphQLType.schemaComposer.createObjectTC({
    fields: {
      endCursor: 'String',
      hasNextPage: 'Boolean!',
    },
    name: 'PageInfo',
  });

export const AidRequestEdgeGraphQLType =
  AidRequestGraphQLType.schemaComposer.createObjectTC({
    fields: {
      node: 'AidRequest!',
    },
    name: 'AidRequestEdge',
  });

export const AidRequestConnectionGraphQLType =
  AidRequestGraphQLType.schemaComposer.createObjectTC({
    fields: {
      edges: '[AidRequestEdge!]!',
      pageInfo: 'PageInfo!',
    },
    name: 'AidRequestConnection',
  });

export const AidRequestHistoryEventTypeGraphQLType =
  schemaComposer.createEnumTC(
    `enum AidRequestHistoryEventType { 
      ChangedWhatIsNeeded
      ChangedWhoIsItFor
      Comment
      Completed 
      Created
      Deleted
      WorkingOn 
    }`,
  );

export const AidRequestUpdateActionTypeGraphQLType =
  schemaComposer.createEnumTC(
    `enum AidRequestUpdateActionType { 
      Add
      Remove
    }`,
  );

export const AidRequestHistoryEventGraphQLType = schemaComposer.createObjectTC({
  fields: {
    action: 'AidRequestUpdateActionType!',
    actor: 'User',
    aidRequest: 'AidRequest',
    event: 'AidRequestHistoryEventType!',
    eventSpecificData: 'String',
    postpublishSummary: 'String',
    timestamp: 'Date!',
    undoID: 'String',
  },
  name: 'AidRequestHistoryEvent',
});

export type AidRequestActivityItem = {
  _id: string;
  actor: () => Promise<Person | null>;
  isComment: boolean;
  message: () => Promise<string>;
  when: string;
};

export const AidRequestActivityItemGraphQLType =
  schemaComposer.createObjectTC<AidRequestActivityItem>({
    fields: {
      _id: 'String!',
      actor: 'Person',
      isComment: 'Boolean!',
      message: 'String!',
      when: 'String!',
    },
    name: 'AidRequestActivityItem',
  });

export const AidRequestActionInputGraphQLType = schemaComposer.createObjectTC({
  fields: {
    action: 'AidRequestUpdateActionType!',
    event: 'AidRequestHistoryEventType!',
    eventSpecificData: 'String',
  },
  name: 'AidRequestActionInput',
});

export const AidRequestActionInputInputType = schemaComposer.createInputTC({
  fields: {
    action: 'AidRequestUpdateActionType!',
    event: 'AidRequestHistoryEventType!',
    eventSpecificData: 'String',
  },
  name: 'AidRequestActionInputInput',
});

export const AidRequestFilterInputType = schemaComposer.createInputTC({
  fields: {
    completed: 'Boolean',
    iAmWorkingOnIt: 'Boolean',
    search: 'String',
  },
  name: 'AidRequestFilterInput',
});

export const AidRequestActionOptionGraphQLType = schemaComposer.createObjectTC({
  fields: {
    icon: 'String',
    input: 'AidRequestActionInput!',
    message: 'String!',
  },
  name: 'AidRequestActionOption',
});

export type CreateAidRequestsPayloadType = {
  postpublishSummary: string;
  requests: MongodbAidRequestRecord[];
};

export const CreateAidRequestsPayloadGraphQLType =
  schemaComposer.createObjectTC({
    fields: {
      postpublishSummary: 'String!',
      requests: [AidRequestGraphQLType],
    },
    name: 'CreateAidRequestsPayload',
  });
