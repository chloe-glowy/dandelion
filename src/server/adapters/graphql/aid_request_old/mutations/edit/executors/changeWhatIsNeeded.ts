import changeStringField from 'src/server/adapters/graphql/aid_request_old/mutations/edit/executors/changeStringField';
import type {
  GraphQLAidRequestUpdateArgs,
  GraphQLAidRequestUpdateResult,
} from 'src/server/adapters/graphql/aid_request_old/mutations/edit/UpdateType';

/**
 * @deprecated Use AidRequest class instead
 */
export default async function changeWhatIsNeeded(
  args: GraphQLAidRequestUpdateArgs,
): Promise<GraphQLAidRequestUpdateResult> {
  return await changeStringField(args, { fieldName: 'whatIsNeeded' });
}
