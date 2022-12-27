import { CC } from 'src/server/context_container/public/ContextContainer';
import { Viewer } from 'src/server/entities/entities_domain/viewer/Viewer';
import { AidRequestSearchPlugin } from 'src/server/interactors/search_aid_requests/plugin/AidRequestSearchPlugin';
import {
  AidRequestSearchInteractorArgs,
  AidRequestSearchInteractorResult,
} from 'src/server/interactors/search_aid_requests/types/AidRequestSearchInteractorTypes';

export abstract class AidRequestSearchUseCase {
  public static async execute(
    cc: CC,
    {
      limitToCompletedRequests,
      limitToIncompleteRequests,
      limitToRequestsViewerIsWorkingOn,
      limitToRequestsViewerIsNotWorkingOn,
      resultCount,
      searchText,
      skipFirst,
    }: AidRequestSearchInteractorArgs,
  ): Promise<AidRequestSearchInteractorResult> {
    const user = Viewer.getUser(cc);
    const isSystem = Viewer.getIsSystem(cc);
    if (user == null && !isSystem) {
      // Logged out users can't search
      throw new Error('You must be logged in to search');
    }

    const queryBuilder = AidRequestSearchPlugin.get().create(cc);

    if (user != null) {
      await queryBuilder.limitToRequestsUserHasPermissionToSee(user);
    }

    if (limitToCompletedRequests) {
      await queryBuilder.limitToCompletedRequests();
    }

    if (limitToIncompleteRequests) {
      await queryBuilder.limitToIncompleteRequests();
    }

    if (limitToRequestsViewerIsWorkingOn) {
      if (user == null) {
        throw new Error(
          'Cannot limit to requests viewer is working on when user is null',
        );
      }
      await queryBuilder.limitToRequestsUserIsWorkingOn(user);
    }

    if (limitToRequestsViewerIsNotWorkingOn) {
      if (user == null) {
        throw new Error(
          'Cannot limit to requests viewer is not working on when user is null',
        );
      }
      await queryBuilder.limitToRequestsUserIsNotWorkingOn(user);
    }

    await queryBuilder.setResultCount(resultCount);
    if (searchText) {
      await queryBuilder.setSearchText(searchText);
    }
    await queryBuilder.setSkipFirst(skipFirst);
    return await queryBuilder.execute();
  }
}
