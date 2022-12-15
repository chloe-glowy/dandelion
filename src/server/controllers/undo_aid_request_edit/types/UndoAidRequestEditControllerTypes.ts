import { UndoAidRequestEditInteractorArgs } from 'src/server/interactors/undo_aid_request_edit/types/UndoAidRequestEditInteractorTypes';
import { AidRequestPresenter } from 'src/server/presenters/public/aid_request/AidRequestPresenter';

export type UndoAidRequestEditControllerArgs = UndoAidRequestEditInteractorArgs;

export type UndoAidRequestEditControllerResult = Readonly<{
  aidRequest: AidRequestPresenter;
}>;
