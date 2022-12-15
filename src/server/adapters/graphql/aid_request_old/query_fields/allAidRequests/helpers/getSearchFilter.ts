// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { PipelineStage } from 'mongoose';
import type { Filter } from 'src/server/adapters/graphql/aid_request_old/query_fields/allAidRequests/helpers/types';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import getEnvironmentVariableAndThrowIfNotFound from 'src/shared/to_clean/env/getEnvironmentVariableAndThrowIfNotFound';

const index = getEnvironmentVariableAndThrowIfNotFound(
  'MONGO_AID_REQUEST_INDEX_NAME',
);

export default function getSearchFilter(
  filter: Filter,
): null | PipelineStage.Search {
  const { search } = filter;
  if (!search) {
    return null;
  }
  return {
    $search: {
      index,
      text: {
        path: {
          wildcard: '*',
        },
        query: search,
      },
    },
  };
}
