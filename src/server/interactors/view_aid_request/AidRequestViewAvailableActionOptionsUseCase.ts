import { CC } from 'src/server/context_container/public/ContextContainer';
import { Viewer } from 'src/server/entities/entities_domain/viewer/Viewer';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { AidRequestDeletedAction } from 'src/server/entities/public/aid_request_action/subtypes/deleted/AidRequestDeletedAction';
import { AidRequestMarkedAsCompletedAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_completed/AidRequestMarkedAsCompletedAction';
import { AidRequestMarkedAsNotCompletedAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_not_completed/AidRequestMarkedAsNotCompletedAction';
import { AidRequestMarkedAsNotWorkingOnAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_not_working_on/AidRequestMarkedAsNotWorkingOnAction';
import { AidRequestMarkedAsWorkingOnAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnAction';
import filterNulls from 'src/shared/language_utils/filterNulls';

export class AidRequestViewAvailableActionOptionsUseCase {
  public static async get(
    cc: CC,
    aidRequest: AidRequest,
  ): Promise<ReadonlyArray<AidRequestAction>> {
    const maybeUser = Viewer.getUser(cc);
    if (maybeUser == null) {
      throw new Error(
        'AidRequestViewActionOptionsUseCase requires viewer to be a User',
      );
    }
    const user = maybeUser;

    const actions = await Promise.all([
      getToggleCompletedOption(),
      getToggleWorkingOnItOption(),
      maybeGetDeleteOption(),
    ]);
    return filterNulls(actions);

    async function maybeGetDeleteOption(): Promise<AidRequestAction | null> {
      const whoRecordedIt = await aidRequest.getWhoRecordedIt();
      const isViewerCreator = whoRecordedIt?.isSameUser(user);
      if (!isViewerCreator) {
        return null;
      }
      return new AidRequestDeletedAction();
    }

    async function getToggleCompletedOption(): Promise<AidRequestAction> {
      const isCompleted = await aidRequest.getIsCompleted();
      return isCompleted
        ? new AidRequestMarkedAsNotCompletedAction()
        : new AidRequestMarkedAsCompletedAction();
    }

    async function getToggleWorkingOnItOption(): Promise<AidRequestAction> {
      const isViewerWorkingOnIt = await aidRequest.getIsUserWorkingOn(user);
      return isViewerWorkingOnIt
        ? new AidRequestMarkedAsNotWorkingOnAction()
        : new AidRequestMarkedAsWorkingOnAction();
    }
  }
}
