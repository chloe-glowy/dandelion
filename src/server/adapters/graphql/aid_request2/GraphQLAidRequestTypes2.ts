import { schemaComposer } from 'graphql-compose';
import {
  AidRequestActionOptionGraphQLType2,
  GraphQLAidRequestActionOptionProperties,
} from 'src/server/adapters/graphql/aid_request_action_option/GraphQLAidRequestActionOptionTypes';
import {
  GraphQLAidRequestHistoryEventProperties,
  GraphQLAidRequestHistoryEventType,
} from 'src/server/adapters/graphql/aid_request_history_event/GraphQLAidRequestHistoryEventTypes';
import {
  GraphQLAidRequestStatusSummaryProperties,
  GraphQLAidRequestStatusSummaryType,
} from 'src/server/adapters/graphql/aid_request_status_summary/GraphQLAidRequestStatusSummaryTypes';
import { GraphQLSharingGroupProxy } from 'src/server/adapters/graphql/sharing_group/GraphQLSharingGroupProxy';
import { SharingGroupGraphQLType2 } from 'src/server/adapters/graphql/sharing_group/GraphQLSharingGroupTypes';
import { GraphQLUserProxy } from 'src/server/adapters/graphql/user2/GraphQLUserProxy';
import { GraphQLUserType2 } from 'src/server/adapters/graphql/user2/GraphQLUserTypes';

export interface GraphQLAidRequestProperties {
  actionsAvailable(): Promise<
    ReadonlyArray<GraphQLAidRequestActionOptionProperties>
  >;
  activity(): Promise<ReadonlyArray<GraphQLAidRequestHistoryEventProperties>>;
  completed(): Promise<boolean>;
  createdAt(): Promise<Date>;
  id(): Promise<string>;
  lastUpdated(): Promise<Date>;
  latestEvent(): Promise<string>;
  sharingGroup(): Promise<GraphQLSharingGroupProxy | null>;
  status(): Promise<GraphQLAidRequestStatusSummaryProperties>;
  whatIsNeeded(): Promise<string>;
  whoIsItFor(): Promise<string>;
  whoIsWorkingOnItUsers(): Promise<ReadonlyArray<GraphQLUserProxy>>;
  whoRecordedIt(): Promise<GraphQLUserProxy | null>;
}

export const AidRequestGraphQLType2 =
  schemaComposer.createObjectTC<GraphQLAidRequestProperties>({
    fields: {
      actionsAvailable: [AidRequestActionOptionGraphQLType2],
      activity: [GraphQLAidRequestHistoryEventType],
      completed: 'Boolean!',
      createdAt: 'Date!',
      id: 'String!',
      lastUpdated: 'Date!',
      latestEvent: 'String!',
      sharingGroup: SharingGroupGraphQLType2,
      status: GraphQLAidRequestStatusSummaryType,
      whatIsNeeded: 'String!',
      whoIsItFor: 'String!',
      whoIsWorkingOnItUsers: [GraphQLUserType2],
      whoRecordedIt: GraphQLUserType2,
    },
    name: 'AidRequest2',
  });
