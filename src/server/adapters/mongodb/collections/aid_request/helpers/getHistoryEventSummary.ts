import { MongodbAidRequestHistoryEvent } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import updateMentions from 'src/server/adapters/mongodb/collections/aid_request/helpers/updateMentions';

export default async function getHistoryEventSummary(
  viewer: Express.User,
  event: MongodbAidRequestHistoryEvent,
): Promise<string> {
  switch (event.event) {
    case 'Comment':
      return await updateMentions(viewer, event.eventSpecificData ?? '');
    case 'Completed':
      return (() => {
        switch (event.action) {
          case 'Add':
            return 'Marked this as complete';
          case 'Remove':
            return 'Marked this as incomplete';
        }
      })();
    case 'Created':
      return 'Recorded this';
    case 'Deleted':
      return (() => {
        switch (event.action) {
          case 'Add':
            return 'Deleted this';
          case 'Remove':
            return 'Restored this from deletion';
        }
      })();
    case 'WorkingOn':
      return (() => {
        switch (event.action) {
          case 'Add':
            return 'Started working on this';
          case 'Remove':
            return 'Stopped working on this';
        }
      })();
    case 'ChangedWhatIsNeeded':
      return changedString(event, 'request title');
    case 'ChangedWhoIsItFor':
      return changedString(event, 'recipient name');
  }
}

function changedString(
  event: MongodbAidRequestHistoryEvent,
  fieldName: string,
): string {
  const { oldValue, newValue } = event;
  return `Changed the ${fieldName} from "${oldValue ?? 'unknown'}" to "${
    newValue ?? 'unknown'
  }"`;
}
