import { CreateAidRequestsInteractorArgs } from 'src/server/interactors/create_aid_requests/types/CreateAidRequestsInteractorTypes';
import { AidRequestPresenter } from 'src/server/presenters/public/aid_request/AidRequestPresenter';

export type CreateAidRequestsControllerArgs = CreateAidRequestsInteractorArgs;

export type CreateAidRequestsControllerResult = Readonly<{
  aidRequests: ReadonlyArray<AidRequestPresenter>;
  postpublishSummary: string;
}>;
