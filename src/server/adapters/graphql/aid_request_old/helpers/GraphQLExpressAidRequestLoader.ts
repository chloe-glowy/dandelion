// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { ViewerPublic } from 'src/server/entities/public/viewer/ViewerPublic';

/**
 * @deprecated Use req.vc and GraphQLRootCall instead.
 */
export class GraphQLExpressAidRequestLoader {
  static async assert({
    req,
    aidRequestID,
    action,
  }: {
    req: Express.Request;
    aidRequestID: string;
    action: string;
  }): Promise<AidRequest> {
    // TODO -- What is the best way for the GraphQL layer to conveniently
    // assert that the user is logged in?
    ViewerPublic.assertLoggedIn(req.cc, action);
    const aidRequest = await AidRequest.load(req.cc, aidRequestID);
    if (aidRequest == null) {
      throw new Error('Unable to load aid request');
    }
    return aidRequest;
  }
}
