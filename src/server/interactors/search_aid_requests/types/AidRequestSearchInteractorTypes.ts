import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';

export type AidRequestSearchInteractorResult = Readonly<{
  aidRequests: ReadonlyArray<AidRequest>;
  hasMore: boolean;
  nextSkipFirst: number;
}>;

export type AidRequestSearchInteractorArgs = Readonly<{
  limitToCompletedRequests: boolean;
  limitToIncompleteRequests: boolean;
  limitToRequestsViewerIsWorkingOn: boolean;
  limitToRequestsViewerIsNotWorkingOn: boolean;
  resultCount: number;
  searchText: string | null;
  skipFirst: number;
}>;
