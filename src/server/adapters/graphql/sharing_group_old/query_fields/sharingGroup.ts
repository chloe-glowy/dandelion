// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { ObjectId } from 'mongodb';
import {
  MongodbSharingGroup,
  SharingGroupGraphQLType,
} from 'src/server/adapters/graphql/sharing_group_old/SharingGroupGraphQLTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { loadSharingGroupForViewer } from 'src/server/adapters/mongodb/collections/sharing_group/helpers/loadSharingGroupForUser';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import analytics from 'src/server/deprecated/analytics';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';

type Args = {
  sharingGroupID: string;
};

export const sharingGroup =
  SharingGroupGraphQLType.schemaComposer.createResolver<Express.User, Args>({
    args: {
      sharingGroupID: 'String!',
    },
    kind: 'query',
    name: 'sharingGroup',
    resolve: async ({
      args,
      context: request,
    }): Promise<MongodbSharingGroup> => {
      const user = assertLoggedIn(request, 'sharingGroup');
      const { sharingGroupID } = args;
      const sharingGroup = await loadSharingGroupForViewer(
        user,
        new ObjectId(sharingGroupID),
      );

      analytics.track({
        event: 'Loaded Sharing Group Details',
        properties: {
          sharingGroupID,
        },
        user,
      });

      return sharingGroup;
    },
    type: 'SharingGroup',
  });
