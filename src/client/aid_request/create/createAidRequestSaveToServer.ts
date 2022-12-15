import { gql } from '@apollo/client';
import type {
  CreateAidRequestsMutation,
  CreateAidRequestsMutationVariables,
} from 'src/client/aid_request/create/__generated__/CreateAidRequestsMutation';
import { SuccessfulSaveData } from 'src/client/aid_request/drafts/AidRequestDrafts';
import { AidRequestCardFragments } from 'src/client/aid_request/fragments/AidRequestCardFragments';
import { validate } from 'src/client/aid_request/fragments/AidRequestGraphQLType';
import { tryOrYieldNullOnError } from 'src/client/error/tryCatch';
import client from 'src/client/graphql/client';
import filterNulls from 'src/shared/language_utils/filterNulls';

export default async function createAidRequestSaveToServer(
  variables: CreateAidRequestsMutationVariables,
): Promise<null | SuccessfulSaveData> {
  return tryOrYieldNullOnError<null | SuccessfulSaveData>(
    async (): Promise<null | SuccessfulSaveData> => {
      const { data } = await client.mutate<
        CreateAidRequestsMutation,
        CreateAidRequestsMutationVariables
      >({
        mutation: CREATE_AID_REQUESTS_MUTATION,
        variables,
      });
      const aidRequests = data?.createAidRequests?.requests;
      const postpublishSummary = data?.createAidRequests?.postpublishSummary;
      if (aidRequests == null || postpublishSummary == null) {
        return null;
      }
      return {
        aidRequests: filterNulls(aidRequests.map(validate)),
        errors: undefined,
        postpublishSummary,
      };
    },
  );
}

const CREATE_AID_REQUESTS_MUTATION = gql`
  mutation CreateAidRequestsMutation(
    $sharingGroupID: String!
    $whatIsNeeded: [String!]!
    $whoIsItFor: String
    $whoIsItForMulti: [String!]
  ) {
    createAidRequests(
      sharingGroupID: $sharingGroupID
      whatIsNeeded: $whatIsNeeded
      whoIsItFor: $whoIsItFor
      whoIsItForMulti: $whoIsItForMulti
    ) {
      postpublishSummary
      requests {
        ...AidRequestCardFragment
      }
    }
  }
  ${AidRequestCardFragments.aidRequest}
`;
