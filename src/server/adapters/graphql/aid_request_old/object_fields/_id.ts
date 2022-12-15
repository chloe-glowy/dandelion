import type { ObjectTypeComposerFieldConfigAsObjectDefinition } from 'graphql-compose';
import type { MongodbAidRequest } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
import { GraphQLExpressAidRequestLoader } from 'src/server/adapters/graphql/aid_request_old/helpers/GraphQLExpressAidRequestLoader';

type ReturnType = string;
const GraphQLType = 'String';

export const _id: ObjectTypeComposerFieldConfigAsObjectDefinition<
  MongodbAidRequest,
  Express.Request,
  Record<string, never>
> = {
  resolve: async (
    { _id: aidRequestID }: MongodbAidRequest,
    _args: Record<string, never>,
    req: Express.Request,
  ): Promise<ReturnType> => {
    const aidRequest = await GraphQLExpressAidRequestLoader.assert({
      action: 'AidRequest._id',
      aidRequestID,
      req,
    });
    return aidRequest.id;
  },
  type: GraphQLType,
};

export default _id;
