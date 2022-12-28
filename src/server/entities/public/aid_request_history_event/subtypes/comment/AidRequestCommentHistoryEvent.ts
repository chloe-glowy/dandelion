import { CC } from 'src/server/context_container/public/ContextContainer';
import {
  AidRequestHistoryEvent,
  AidRequestHistoryEventSubtypeHandlers,
} from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestCommentHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/comment/AidRequestCommentHistoryEventDBProxy';
import { UpdateUserSubmittedTextWithMentionsContentsOnRead } from 'src/server/entities/public/mentions/UpdateUserSubmittedTextWithMentionsContentsOnRead';

export class AidRequestCommentHistoryEvent extends AidRequestHistoryEvent {
  public constructor(
    public readonly cc: CC,
    protected readonly dbProxy: AidRequestCommentHistoryEventDBProxy,
  ) {
    super();
  }

  public async getCommentContents(): Promise<string> {
    const storedCommentContents = await this.dbProxy.getRawCommentContents();
    // Since replacing the mentions in the comment contents is a critical
    // part of reading a comment, involving comment content correctness and
    // privacy of the viewer, we do it here in the entity.
    return await UpdateUserSubmittedTextWithMentionsContentsOnRead.exec(
      this.cc,
      storedCommentContents,
    );
  }

  public async supportsUndo(): Promise<boolean> {
    return true;
  }

  public handleSubtype<T>(
    handlers: AidRequestHistoryEventSubtypeHandlers<T>,
  ): T {
    return handlers.AidRequestCommentHistoryEvent(this);
  }
}
