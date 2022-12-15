import type { GraphQLAidRequestUpdateArgs } from 'src/server/adapters/graphql/aid_request_old/mutations/edit/UpdateType';

/**
 * @deprecated Use AidRequest class instead
 */
export default function getIsAdd(args: GraphQLAidRequestUpdateArgs): boolean {
  return args.input.action === 'Add';
}
