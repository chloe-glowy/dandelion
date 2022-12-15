import { EditAidRequestInteractorArgs } from 'src/server/interactors/edit_aid_requests/types/EditAidRequestInteractorTypes';
import { AidRequestPresenter } from 'src/server/presenters/public/aid_request/AidRequestPresenter';

export type EditAidRequestControllerArgs = EditAidRequestInteractorArgs;

export type EditAidRequestControllerResult = Readonly<{
  aidRequest: AidRequestPresenter;
  historyEventIDForUndo: string | undefined;
  postpublishSummary: string;
}>;
