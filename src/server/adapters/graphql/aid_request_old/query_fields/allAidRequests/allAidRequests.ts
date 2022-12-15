// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { PipelineStage } from 'mongoose';
import type {
  AidRequestConnectionType,
  MongodbAidRequest,
} from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
import {
  AidRequestFilterInputType,
  AidRequestGraphQLType,
} from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
import getCompletedFilter from 'src/server/adapters/graphql/aid_request_old/query_fields/allAidRequests/helpers/getCompletedFilter';
import getIAmWorkingOnItFilter from 'src/server/adapters/graphql/aid_request_old/query_fields/allAidRequests/helpers/getIAmWorkingOnItFilter';
import getSearchFilter from 'src/server/adapters/graphql/aid_request_old/query_fields/allAidRequests/helpers/getSearchFilter';
import getSharingGroupFilter from 'src/server/adapters/graphql/aid_request_old/query_fields/allAidRequests/helpers/getSharingGroupFilter';
import type { Filter } from 'src/server/adapters/graphql/aid_request_old/query_fields/allAidRequests/helpers/types';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { MongodbAidRequestModel } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import analytics from 'src/server/deprecated/analytics';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';
import filterNulls from 'src/shared/language_utils/filterNulls';

type Args = {
  filter: Filter;
  after: string | null | undefined;
  first: number;
};

const aidRequests = AidRequestGraphQLType.schemaComposer.createResolver<
  Express.User,
  Args
>({
  args: {
    after: 'String',
    filter: AidRequestFilterInputType,
    first: 'Int',
  },
  kind: 'query',
  name: 'aidRequests',
  resolve: async ({
    args,
    context: request,
  }): Promise<AidRequestConnectionType> => {
    const user = assertLoggedIn(request, 'aidRequests');
    const { after, first, filter } = args;
    const $skip = Math.max(0, parseInt(after || '0'));
    const $limit = first;

    analytics.track({
      event: 'Loaded Aid Requests',
      properties: {
        isCompletedFilter: filter?.completed === true ? 'true' : 'false',
        isFirstPage: after == null ? 'true' : 'false',
        isMeFilter: filter?.iAmWorkingOnIt ? 'true' : 'false',
        search: args.filter?.search || '',
      },
      user,
    });

    const filters: Array<PipelineStage> = filterNulls([
      getSearchFilter(filter),
      getCompletedFilter(filter),
      ...getIAmWorkingOnItFilter(user, filter),
      ...getSharingGroupFilter(user),
    ]);
    const stages: Array<PipelineStage> = [
      ...filters,
      {
        $sort: {
          lastUpdated: -1,
        },
      },
      {
        $facet: {
          data: [{ $skip }, { $limit }],
          metadata: [{ $count: 'total' }],
        },
      },
      {
        $project: {
          data: 1,
          total: { $arrayElemAt: ['$metadata.total', 0] },
        },
      },
    ];
    const query = MongodbAidRequestModel.aggregate<{
      data: MongodbAidRequest[];
      total: number;
    }>(stages);
    const [result] = await query;
    const { data, total } = result;
    const nextSkip = $skip + data.length;
    const hasMore = total > nextSkip;

    return {
      edges: data.map((node: MongodbAidRequest) => ({ node })),
      pageInfo: {
        endCursor: String(nextSkip),
        hasNextPage: hasMore,
      },
    };
  },
  type: 'AidRequestConnection!',
});

export default aidRequests;
