import AidRequestUpdatedIDsEventStream from 'src/client/aid_request/cache/AidRequestUpdatedIDsEventStream';
import LocalUpdateSubscriberStore, {
  SubscriberValue,
} from 'src/client/aid_request/cache/LocalUpdateSubscriberStore';
import { isDraftID } from 'src/client/aid_request/drafts/AidRequestDraftIDs';
import { graphqlNodeDraftStore } from 'src/client/aid_request/drafts/AidRequestDraftsMemoryStore';
import { FilterContext } from 'src/client/aid_request/filter/FilterContext';
import { FILTERS } from 'src/client/aid_request/filter/RequestExplorerFilters';
import { FilterType } from 'src/client/aid_request/filter/RequestExplorerFiltersStore';
import {
  AidRequestGraphQLEdgeType,
  AidRequestGraphQLType,
  validateEdge,
} from 'src/client/aid_request/fragments/AidRequestGraphQLType';
import {
  LIST_OF_AID_REQUESTS_QUERY,
  PAGE_SIZE,
} from 'src/client/aid_request/list/ListOfAidRequestsQuery';
import {
  ListOfAidRequestsQuery,
  ListOfAidRequestsQueryVariables,
} from 'src/client/aid_request/list/__generated__/ListOfAidRequestsQuery';
import client from 'src/client/graphql/client';
import filterNulls from 'src/shared/language_utils/filterNulls';

export function broadcastUpdatedAidRequest(
  aidRequestID: string,
  aidRequest: AidRequestGraphQLType | undefined | null,
): void {
  broadcastAidRequestUpdates([{ id: aidRequestID, value: aidRequest }]);
}

export function broadcastManyNewAidRequests(
  aidRequests: Array<AidRequestGraphQLType | undefined | null>,
): void {
  broadcastAidRequestUpdates(
    filterNulls(aidRequests).map((value) => ({ id: value._id, value })),
  );
}

export function broadcastDeletedAidRequest(aidRequestID: string): void {
  broadcastAidRequestUpdates([{ id: aidRequestID, value: null }]);
}

type Update = {
  id: string;
  value: AidRequestGraphQLType | undefined | null;
};

function broadcastAidRequestUpdates(updates: Update[]): void {
  AidRequestUpdatedIDsEventStream.publish(updates.map(({ id }) => id));
  LocalUpdateSubscriberStore.forEach((subscriber: SubscriberValue): void => {
    processAidRequestUpdatesForSubscriber(subscriber, updates);
  });
}

function processAidRequestUpdatesForSubscriber(
  subscriber: SubscriberValue,
  updates: Update[],
): void {
  const { filter, filterContext } = subscriber;
  const toAdd: AidRequestGraphQLType[] = [];
  const toRemove: string[] = [];
  updates.forEach((update: Update): void => {
    if (passesFilter(subscriber, update)) {
      const { value } = update;
      if (value != null && !idIsPresent(subscriber, update)) {
        toAdd.push(value);
      }
    } else {
      if (idIsPresent(subscriber, update)) {
        toRemove.push(update.id);
      }
    }
  });
  const oldEdges = filterNulls(subscriber.data.allAidRequests?.edges ?? []);
  const filteredEdges: AidRequestGraphQLEdgeType[] = filterNulls(
    oldEdges.map(validateEdge),
  ).filter((edge) => !toRemove.includes(edge.node._id));
  const withAdditions: AidRequestGraphQLEdgeType[] = [
    ...toAdd.map(
      (node) =>
        ({
          __typename: 'AidRequestEdge',
          node,
        } as AidRequestGraphQLEdgeType),
    ),
    ...filteredEdges,
  ];
  publishNewEdges(filter, withAdditions, subscriber.data, filterContext);
}

function passesFilter(subscriber: SubscriberValue, update: Update): boolean {
  const { value: aidRequest } = update;
  const { filter, filterContext } = subscriber;
  if (aidRequest == null) {
    return false;
  }
  return FILTERS.every(({ passes }) =>
    passes(filter, aidRequest, filterContext),
  );
}

function idIsPresent(subscriber: SubscriberValue, update: Update): boolean {
  const { id } = update;
  const { data } = subscriber;
  return (data.allAidRequests?.edges ?? []).some(
    (edge) => edge?.node?._id === id,
  );
}

function publishNewEdges(
  filter: FilterType,
  edges_: AidRequestGraphQLEdgeType[],
  list: ListOfAidRequestsQuery,
  filterContext: FilterContext,
): void {
  const edges = edges_.filter(isNotStaleDraft).sort((a, b) => {
    return (
      new Date(b.node.lastUpdated).valueOf() -
      new Date(a.node.lastUpdated).valueOf()
    );
  });
  const data: ListOfAidRequestsQuery = {
    allAidRequests: {
      __typename: 'AidRequestConnection',
      edges,
      pageInfo: list.allAidRequests?.pageInfo ?? {
        __typename: 'PageInfo',
        endCursor: null,
        hasNextPage: true,
      },
    },
  };
  client.cache.writeQuery<
    ListOfAidRequestsQuery,
    ListOfAidRequestsQueryVariables
  >({
    broadcast: true,
    data,
    overwrite: true,
    query: LIST_OF_AID_REQUESTS_QUERY,
    variables: { after: null, filter, pageSize: PAGE_SIZE },
  });
  LocalUpdateSubscriberStore.add({ data, filter, filterContext });
}

function isNotStaleDraft(value: AidRequestGraphQLEdgeType): boolean {
  const id = value.node._id;
  if (!isDraftID(id)) {
    return true;
  }
  return graphqlNodeDraftStore.getValue().some((draft) => draft._id === id);
}
