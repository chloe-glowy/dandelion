import type {
  MongodbAidRequestHistoryEvent,
  MongodbAidRequestRecord,
} from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import searchPrefixes from 'src/server/adapters/mongodb/collections/aid_request/helpers/searchPrefixes';
import { UserModel } from 'src/server/adapters/mongodb/collections/user/UserModel';

export type ComputedKey =
  | 'lastUpdated'
  | 'whoIsItForSearch'
  | 'whatIsNeededSearch'
  | 'whoIsWorkingOnItSearch'
  | 'whoRecordedItSearch'
  | 'whoRecordedItUsername';

export type DeprecatedKey = 'crew';

export default async function getComputedFields(
  fields: Omit<
    Omit<MongodbAidRequestRecord, ComputedKey>,
    '_id' | DeprecatedKey
  >,
): Promise<
  Omit<Pick<MongodbAidRequestRecord, ComputedKey>, '_id' | DeprecatedKey>
> {
  const { history, whatIsNeeded, whoIsItFor, whoIsWorkingOnIt, whoRecordedIt } =
    fields;

  const lastUpdated =
    history.reduce(
      (
        a: Date | null,
        { timestamp: b }: MongodbAidRequestHistoryEvent,
      ): Date => {
        if (a == null) {
          return b;
        }
        return a.valueOf() > b.valueOf() ? a : b;
      },
      null,
    ) ?? fields.createdAt;
  const whoIsWorkingOnItUsers = await Promise.all(
    whoIsWorkingOnIt.map((id) => UserModel.findById(id)),
  );
  const whoRecordedItUser = await UserModel.findById(whoRecordedIt);
  const whatIsNeededSearch = searchPrefixes(whatIsNeeded);
  const whoIsItForSearch = searchPrefixes(whoIsItFor);
  const whoIsWorkingOnItSearch = searchPrefixes(
    whoIsWorkingOnItUsers
      .filter(Boolean)
      .map((user) => user?.displayName)
      .join(' '),
  );
  const whoRecordedItSearch = searchPrefixes(
    whoRecordedItUser?.displayName ?? '',
  );
  return {
    lastUpdated,
    whatIsNeededSearch,
    whoIsItForSearch,
    whoIsWorkingOnItSearch,
    whoRecordedItSearch,
    whoRecordedItUsername: whoRecordedItUser?.username || '',
  };
}
