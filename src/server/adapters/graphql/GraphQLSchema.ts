// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type { Express } from 'express';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { graphqlHTTP } from 'express-graphql';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SchemaComposer } from 'graphql-compose';
import AidRequest from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLImpl';
import reportError from 'src/server/adapters/graphql/reportError';
import { SharingGroup2 } from 'src/server/adapters/graphql/sharing_group/GraphQLSharingGroupSchema';
import { SharingGroup } from 'src/server/adapters/graphql/sharing_group_old/SharingGroupGraphQLImpl';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import AidRequestNotificationSettings from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/AidRequestNotificationSettingsGraphQLImpl';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import attributions from 'src/server/adapters/mongodb/collections/user/root_fields/attribution/attributions';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import User from 'src/server/adapters/mongodb/collections/user/UserGraphQLImpl';

const composer = new SchemaComposer();

composer.Query.addFields({
  ...AidRequest.QueryFields,
  ...User.QueryFields,
  ...AidRequestNotificationSettings.QueryFields,
  ...SharingGroup.QueryFields,
  ...SharingGroup2.QueryFields,
  attributions,
});

composer.Mutation.addFields({
  ...AidRequest.MutationFields,
  ...User.MutationFields,
  ...AidRequestNotificationSettings.MutationFields,
  reportError,
});

const schema = composer.buildSchema();

export function initGraphQL(app: Express): void {
  app.use(
    '/graphql',
    graphqlHTTP({
      graphiql: true,
      schema,
    }),
  );
}
