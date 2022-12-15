import { MongodbAidRequestHistoryEvent } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import { MongodbAidRequestChangedWhatIsNeededHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/subtypes/changed_what_is_needed/MongodbAidRequestChangedWhatIsNeededHistoryEventDBProxy';
import { MongodbAidRequestChangedWhoIsItForHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/subtypes/changed_who_is_it_for/MongodbAidRequestChangedWhoIsItForHistoryEventDBProxy';
import { MongodbAidRequestCommentHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/subtypes/comment/MongodbAidRequestCommentHistoryEventDBProxy';
import { MongodbAidRequestCreatedHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/subtypes/created/MongodbAidRequestCreatedHistoryEventDBProxy';
import { MongodbAidRequestDeletedHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/subtypes/deleted/MongodbAidRequestDeletedHistoryEventDBProxy';
import { MongodbAidRequestMarkedAsCompletedHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/subtypes/marked_as_completed/MongodbAidRequestMarkedAsCompletedHistoryEventDBProxy';
import { MongodbAidRequestMarkedAsNotCompletedHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/subtypes/marked_as_not_completed/MongodbAidRequestMarkedAsNotCompletedHistoryEventDBProxy';
import { MongodbAidRequestMarkedAsNotWorkingOnHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/subtypes/marked_as_not_working_on/MongodbAidRequestMarkedAsNotWorkingOnHistoryEventDBProxy';
import { MongodbAidRequestMarkedAsWorkingOnHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/subtypes/marked_as_working_on/MongodbAidRequestMarkedAsWorkingOnHistoryEventDBProxy';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestChangedWhatIsNeededHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededHistoryEvent';
import { AidRequestChangedWhoIsItForHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForHistoryEvent';
import { AidRequestCommentHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/comment/AidRequestCommentHistoryEvent';
import { AidRequestCreatedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/created/AidRequestCreatedHistoryEvent';
import { AidRequestDeletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/deleted/AidRequestDeletedHistoryEvent';
import { AidRequestMarkedAsCompletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_completed/AidRequestMarkedAsCompletedHistoryEvent';
import { AidRequestMarkedAsNotCompletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_not_completed/AidRequestMarkedAsNotCompletedHistoryEvent';
import { AidRequestMarkedAsNotWorkingOnHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_not_working_on/AidRequestMarkedAsNotWorkingOnHistoryEvent';
import { AidRequestMarkedAsWorkingOnHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnHistoryEvent';

export abstract class MongodbAidRequestHistoryEventDBProxyFactory {
  public static create(
    cc: CC,
    mongodbHistoryEvent: MongodbAidRequestHistoryEvent,
  ): AidRequestHistoryEvent {
    switch (mongodbHistoryEvent.event) {
      case 'Created':
        return new AidRequestCreatedHistoryEvent(
          cc,
          new MongodbAidRequestCreatedHistoryEventDBProxy(
            cc,
            mongodbHistoryEvent,
          ),
        );
      case 'ChangedWhatIsNeeded':
        return new AidRequestChangedWhatIsNeededHistoryEvent(
          cc,
          new MongodbAidRequestChangedWhatIsNeededHistoryEventDBProxy(
            cc,
            mongodbHistoryEvent,
          ),
        );
      case 'ChangedWhoIsItFor':
        return new AidRequestChangedWhoIsItForHistoryEvent(
          cc,
          new MongodbAidRequestChangedWhoIsItForHistoryEventDBProxy(
            cc,
            mongodbHistoryEvent,
          ),
        );
      case 'Comment':
        return new AidRequestCommentHistoryEvent(
          cc,
          new MongodbAidRequestCommentHistoryEventDBProxy(
            cc,
            mongodbHistoryEvent,
          ),
        );
      case 'Completed':
        switch (mongodbHistoryEvent.action) {
          case 'Add':
            return new AidRequestMarkedAsCompletedHistoryEvent(
              cc,
              new MongodbAidRequestMarkedAsCompletedHistoryEventDBProxy(
                cc,
                mongodbHistoryEvent,
              ),
            );
          case 'Remove':
            return new AidRequestMarkedAsNotCompletedHistoryEvent(
              cc,
              new MongodbAidRequestMarkedAsNotCompletedHistoryEventDBProxy(
                cc,
                mongodbHistoryEvent,
              ),
            );
        }
        break;
      case 'Deleted':
        return new AidRequestDeletedHistoryEvent(
          cc,
          new MongodbAidRequestDeletedHistoryEventDBProxy(
            cc,
            mongodbHistoryEvent,
          ),
        );
      case 'WorkingOn':
        switch (mongodbHistoryEvent.action) {
          case 'Add':
            return new AidRequestMarkedAsWorkingOnHistoryEvent(
              cc,
              new MongodbAidRequestMarkedAsWorkingOnHistoryEventDBProxy(
                cc,
                mongodbHistoryEvent,
              ),
            );
          case 'Remove':
            return new AidRequestMarkedAsNotWorkingOnHistoryEvent(
              cc,
              new MongodbAidRequestMarkedAsNotWorkingOnHistoryEventDBProxy(
                cc,
                mongodbHistoryEvent,
              ),
            );
        }
        break;
      default:
        throw new Error(
          `Unrecognized event type -- ${mongodbHistoryEvent.event} (${mongodbHistoryEvent.action}). ID = ${mongodbHistoryEvent._id}`,
        );
    }
  }
}
