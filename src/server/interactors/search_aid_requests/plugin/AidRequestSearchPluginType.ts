import { CC } from 'src/server/context_container/public/ContextContainer';
import { User } from 'src/server/entities/public/user/User';
import { AidRequestSearchInteractorResult } from 'src/server/interactors/search_aid_requests/types/AidRequestSearchInteractorTypes';

export interface AidRequestSearchPluginType {
  create(cc: CC): AidRequestSearchBuilder;
}

export interface AidRequestSearchBuilder {
  limitToRequestsUserHasPermissionToSee(
    user: User,
  ): Promise<AidRequestSearchBuilder>;
  limitToCompletedRequests(): Promise<AidRequestSearchBuilder>;
  limitToIncompleteRequests(): Promise<AidRequestSearchBuilder>;
  limitToRequestsUserIsWorkingOn(user: User): Promise<AidRequestSearchBuilder>;
  limitToRequestsUserIsNotWorkingOn(
    user: User,
  ): Promise<AidRequestSearchBuilder>;
  setResultCount(count: number): Promise<AidRequestSearchBuilder>;
  setSearchText(text: string): Promise<AidRequestSearchBuilder>;
  setSkipFirst(count: number): Promise<AidRequestSearchBuilder>;

  execute(): Promise<AidRequestSearchInteractorResult>;
}
