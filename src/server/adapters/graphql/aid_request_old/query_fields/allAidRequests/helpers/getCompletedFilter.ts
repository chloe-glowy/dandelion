// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { PipelineStage } from 'mongoose';
import type { Filter } from 'src/server/adapters/graphql/aid_request_old/query_fields/allAidRequests/helpers/types';

export default function getCompletedFilter(
  filter: Filter,
): null | PipelineStage {
  const { completed } = filter;
  if (completed == null) {
    return null;
  }
  return {
    $match: {
      completed,
    },
  };
}
