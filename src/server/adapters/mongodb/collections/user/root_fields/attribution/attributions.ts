// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { schemaComposer } from 'graphql-compose';
import config from 'src/server/adapters/mongodb/collections/user/root_fields/attribution/attribution-config.json';

const AttributionGraphQLType = schemaComposer.createObjectTC<Attribution>({
  fields: {
    icon: 'String!',
    text: 'String!',
  },
  name: 'Attribution',
});

type Attribution = {
  icon: string;
  text: string;
};

function attributionsResolver(
  _: unknown,
  _args: Record<string, never>,
  _req: Express.Request,
): Array<Attribution> {
  return config;
}

const attributions = {
  resolve: attributionsResolver,
  type: [AttributionGraphQLType],
};

export default attributions;
