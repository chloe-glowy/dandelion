import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/plugins/interfaces/AidRequestHistoryEventDBProxy';
import { AidRequestChangedWhatIsNeededHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededHistoryEvent';
import { AidRequestChangedWhoIsItForHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForHistoryEvent';
import { AidRequestCommentHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/comment/AidRequestCommentHistoryEvent';
import { AidRequestCreatedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/created/AidRequestCreatedHistoryEvent';
import { AidRequestDeletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/deleted/AidRequestDeletedHistoryEvent';
import { AidRequestMarkedAsCompletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_completed/AidRequestMarkedAsCompletedHistoryEvent';
import { AidRequestMarkedAsNotCompletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_not_completed/AidRequestMarkedAsNotCompletedHistoryEvent';
import { AidRequestMarkedAsNotWorkingOnHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_not_working_on/AidRequestMarkedAsNotWorkingOnHistoryEvent';
import { AidRequestMarkedAsWorkingOnHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnHistoryEvent';
import { User } from 'src/server/entities/public/user/User';

export abstract class AidRequestHistoryEvent {
  public abstract readonly cc: CC;
  protected abstract readonly dbProxy: AidRequestHistoryEventDBProxy;

  public async getID(): Promise<string> {
    return await this.dbProxy.getID();
  }

  public async getTimestamp(): Promise<Date> {
    return await this.dbProxy.getTimestamp();
  }

  public async getActor(): Promise<User | null> {
    return await this.dbProxy.getActor();
  }

  public abstract supportsUndo(): Promise<boolean>;

  public abstract handleSubtype<T>(
    handlers: AidRequestHistoryEventSubtypeHandlers<T>,
  ): T;
}

export type AidRequestHistoryEventSubtypeHandlers<T> = Readonly<{
  AidRequestCommentHistoryEvent: (
    historyEvent: AidRequestCommentHistoryEvent,
  ) => T;
  AidRequestMarkedAsNotWorkingOnHistoryEvent: (
    historyEvent: AidRequestMarkedAsNotWorkingOnHistoryEvent,
  ) => T;
  AidRequestMarkedAsWorkingOnHistoryEvent: (
    historyEvent: AidRequestMarkedAsWorkingOnHistoryEvent,
  ) => T;
  AidRequestChangedWhatIsNeededHistoryEvent: (
    historyEvent: AidRequestChangedWhatIsNeededHistoryEvent,
  ) => T;
  AidRequestCreatedHistoryEvent: (
    historyEvent: AidRequestCreatedHistoryEvent,
  ) => T;
  AidRequestMarkedAsNotCompletedHistoryEvent: (
    historyEvent: AidRequestMarkedAsNotCompletedHistoryEvent,
  ) => T;
  AidRequestChangedWhoIsItForHistoryEvent: (
    historyEvent: AidRequestChangedWhoIsItForHistoryEvent,
  ) => T;
  AidRequestMarkedAsCompletedHistoryEvent: (
    historyEvent: AidRequestMarkedAsCompletedHistoryEvent,
  ) => T;
  AidRequestDeletedHistoryEvent: (
    historyEvent: AidRequestDeletedHistoryEvent,
  ) => T;
}>;
