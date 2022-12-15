import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestSearchUseCase } from 'src/server/interactors/search_aid_requests/AidRequestSearchInteractor';
import { AidRequestSearchInteractorArgs } from 'src/server/interactors/search_aid_requests/types/AidRequestSearchInteractorTypes';
import { AidRequestPresenter } from 'src/server/presenters/public/aid_request/AidRequestPresenter';

export abstract class AidRequestSearchPresenter {
  public static async execute(
    cc: CC,
    args: AidRequestSearchPresenterInputType,
  ): Promise<AidRequestSearchPresenterQueryResult> {
    const result = await AidRequestSearchUseCase.execute(cc, args);
    return {
      ...result,
      aidRequests: result.aidRequests.map(
        (aidRequest) => new AidRequestPresenter(cc, aidRequest),
      ),
    };
  }
}

export type AidRequestSearchPresenterQueryResult = Readonly<{
  aidRequests: ReadonlyArray<AidRequestPresenter>;
  hasMore: boolean;
  nextSkipFirst: number;
}>;

export type AidRequestSearchPresenterInputType = AidRequestSearchInteractorArgs;
