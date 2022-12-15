// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type { ObjectTypeComposerFieldConfigAsObjectDefinition } from 'graphql-compose';
import { ObjectId } from 'mongodb';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type { MongodbAidRequest } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
import { maybeLoadAidRequestForViewer } from 'src/server/adapters/mongodb/collections/aid_request/helpers/loadAidRequestForViewer';
import { UserModel } from 'src/server/adapters/mongodb/collections/user/UserModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';
import filterNulls from 'src/shared/language_utils/filterNulls';

const aidRequestsIAmWorkingOn: ObjectTypeComposerFieldConfigAsObjectDefinition<
  Express.User,
  Express.Request,
  Record<string, never>
> = {
  resolve: async (
    { _id: userID }: Express.User,
    _args: Record<string, never>,
    req: Express.Request,
  ): Promise<Array<MongodbAidRequest>> => {
    const viewer = assertLoggedIn(req, 'aidRequestsIAmWorkingOn');
    const user = await UserModel.findById(userID);
    if (user == null) {
      return [];
    }
    const aidRequests = await Promise.all(
      (user.aidRequestsIAmWorkingOn ?? []).map(
        async (aidRequestID: ObjectId) => {
          return await maybeLoadAidRequestForViewer(
            viewer,
            aidRequestID.toString(),
          );
        },
      ),
    );
    return filterNulls(aidRequests);
  },
  type: '[AidRequest]',
};

export default aidRequestsIAmWorkingOn;
