import { GraphQLAidRequestProxy } from 'src/server/adapters/graphql/aid_request2/GraphQLAidRequestProxy';
import { AidRequestGraphQLType2 } from 'src/server/adapters/graphql/aid_request2/GraphQLAidRequestTypes2';
import { GraphQLRootCall } from 'src/server/adapters/graphql/aid_request_old/helpers/GraphQLRootCall';
import { AidRequestPresenter } from 'src/server/presenters/public/aid_request/AidRequestPresenter';

type Args = {
  aidRequestID: string;
};

type ReturnType = GraphQLAidRequestProxy | null;

export const aidRequest2 = GraphQLRootCall.create<Args, ReturnType>({
  args: {
    aidRequestID: 'String!',
  },
  kind: 'query',
  name: 'aidRequest2',
  resolve: async (cc, { aidRequestID }): Promise<ReturnType> => {
    const aidRequest = await AidRequestPresenter.load(cc, aidRequestID);
    return aidRequest == null ? null : new GraphQLAidRequestProxy(aidRequest);
  },
  type: AidRequestGraphQLType2,
});
