import { GraphQLRootCall } from 'src/server/adapters/graphql/aid_request_old/helpers/GraphQLRootCall';
import { GraphQLSharingGroupProxy } from 'src/server/adapters/graphql/sharing_group/GraphQLSharingGroupProxy';
import { SharingGroupGraphQLType2 } from 'src/server/adapters/graphql/sharing_group/GraphQLSharingGroupTypes';
import { SharingGroupPresenter } from 'src/server/presenters/public/sharing_group/SharingGroupPresenter';

type Args = {
  sharingGroupID: string;
};

type ReturnType = GraphQLSharingGroupProxy | null;

export const sharingGroup2 = GraphQLRootCall.create<Args, ReturnType>({
  args: {
    sharingGroupID: 'String!',
  },
  name: 'sharingGroup2',
  resolve: async (vc, { sharingGroupID }): Promise<ReturnType> => {
    const sharingGroupPresenter = await SharingGroupPresenter.load(
      vc,
      sharingGroupID,
    );
    return sharingGroupPresenter == null
      ? null
      : new GraphQLSharingGroupProxy(sharingGroupPresenter);
  },
  type: SharingGroupGraphQLType2,
});
