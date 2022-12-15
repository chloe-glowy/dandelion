import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';

export class AidRequestViewHistoryOldestToNewestUseCase {
  public static async get(
    aidRequest: AidRequest,
  ): Promise<ReadonlyArray<AidRequestHistoryEvent>> {
    const activityItems = await aidRequest.getActivityHistory();
    const activityItemsAndTimestamps = await Promise.all(
      activityItems.map(async (item) => {
        const timestamp = await item.getTimestamp();
        return {
          item,
          timestamp,
        };
      }),
    );
    activityItemsAndTimestamps.sort(
      (a, b) => b.timestamp.valueOf() - a.timestamp.valueOf(),
    );
    return activityItemsAndTimestamps.map((_) => _.item);
  }
}
