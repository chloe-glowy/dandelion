import { name } from 'src/server/adapters/graphql/sharing_group_old/fields/name';
import { _id } from 'src/server/adapters/graphql/sharing_group_old/fields/_id';
import { sharingGroup } from 'src/server/adapters/graphql/sharing_group_old/query_fields/sharingGroup';
import { SharingGroupGraphQLType } from 'src/server/adapters/graphql/sharing_group_old/SharingGroupGraphQLTypes';

SharingGroupGraphQLType.addFields({
  _id,
  name,
});

export const SharingGroup = {
  QueryFields: {
    sharingGroup,
  },
};
