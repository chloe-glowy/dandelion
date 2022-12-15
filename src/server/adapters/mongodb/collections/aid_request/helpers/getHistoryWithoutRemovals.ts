import type { MongodbAidRequestHistoryEvent } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import { MongodbAidRequest } from 'src/server/adapters/mongodb/aid_request/types/MongodbAidRequest';

export default function getHistoryWithoutRemovals(
  aidRequest: MongodbAidRequest,
): Array<MongodbAidRequestHistoryEvent> {
  const history = aidRequest.history;
  const toRemove = new Set<MongodbAidRequestHistoryEvent>();
  const unpairedAdds: Map<string, MongodbAidRequestHistoryEvent> = new Map();
  [...history]
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    .forEach((historyEvent) => {
      const { action, actor } = historyEvent;
      const key = `${actor.toString()}.${encodeDetails(historyEvent)}`;
      if (action === 'Add') {
        unpairedAdds.set(key, historyEvent);
      } else {
        const unpairedEvent = unpairedAdds.get(key);
        if (unpairedEvent != null) {
          unpairedAdds.delete(key);
          toRemove.add(historyEvent);
          toRemove.add(unpairedEvent);
        }
      }
    });
  return history.filter((event) => !toRemove.has(event));
}

function encodeDetails(historyEvent: MongodbAidRequestHistoryEvent): string {
  const { event, eventSpecificData, oldValue, newValue } = historyEvent;
  switch (event) {
    case 'Completed':
    case 'Created':
    case 'WorkingOn':
    case 'Deleted':
      return event;
    case 'Comment':
      return `Comment:${eventSpecificData ?? ''}`;
    case 'ChangedWhatIsNeeded':
    case 'ChangedWhoIsItFor':
      return JSON.stringify({
        event,
        newValue,
        oldValue,
      });
  }
}
