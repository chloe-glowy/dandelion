import type { Express } from 'express';
import { ViewerPublic } from 'src/server/entities/public/viewer/ViewerPublic';

export function initViewerContextForExpress(app: Express): void {
  app.use(async (req, _res, next) => {
    const { user: expressUser, cc } = req;
    if (cc == null) {
      throw new Error(
        'initViewerContextForExpress: Expected cc to be set in request',
      );
    }
    const userID = expressUser?._id?.toString() ?? null;

    // If user is set on the request, it has already been authenticated
    // by passport.
    const authenticatedID = new AuthenticatedIDForExpressRequest(userID);
    await ViewerPublic.initializeViewerContext(cc, authenticatedID);
    next();
  });
}

class AuthenticatedIDForExpressRequest {
  constructor(public readonly id: string | null) {}

  get isSystem(): boolean {
    return false;
  }
}
