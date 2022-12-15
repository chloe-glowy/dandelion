import { AidRequestCommentHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/comment/AidRequestCommentHistoryEvent';
import { AidRequestHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/AidRequestHistoryEventPresenter';

export class AidRequestCommentHistoryEventPresenter extends AidRequestHistoryEventPresenter {
  constructor(protected event: AidRequestCommentHistoryEvent) {
    super();
  }

  public async getMessage(): Promise<string> {
    return await this.event.getCommentContents();
  }

  public async getIsComment(): Promise<boolean> {
    return true;
  }

  protected async getShortSummaryVerb(): Promise<string> {
    return 'commented';
  }
}
