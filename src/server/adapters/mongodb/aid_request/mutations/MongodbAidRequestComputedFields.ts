import {
  MongodbAidRequestHistoryEvent,
  MongodbAidRequestRecord,
} from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import searchPrefixes from 'src/server/adapters/mongodb/collections/aid_request/helpers/searchPrefixes';
import { UserModel } from 'src/server/adapters/mongodb/collections/user/UserModel';

type ComputedKey =
  | 'lastUpdated'
  | 'whoIsItForSearch'
  | 'whatIsNeededSearch'
  | 'whoIsWorkingOnItSearch'
  | 'whoRecordedItSearch'
  | 'whoRecordedItUsername';

type DBAssignedKey = '_id';

export type MongodbAidRequestComputedFieldsManualFields = Omit<
  MongodbAidRequestRecord,
  ComputedKey | DBAssignedKey
>;

type ManualFields = MongodbAidRequestComputedFieldsManualFields;

type ComputedFields = Pick<MongodbAidRequestRecord, ComputedKey>;

export abstract class MongodbAidRequestComputedFields {
  public static async compute(fields: ManualFields): Promise<ComputedFields> {
    const lastUpdated = this.getLastUpdated(fields);

    const { whatIsNeeded, whoIsItFor, whoIsWorkingOnIt, whoRecordedIt } =
      fields;

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

  private static getLastUpdated({
    history,
    createdAt,
  }: ManualFields): ComputedFields['lastUpdated'] {
    return (
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
      ) ?? createdAt
    );
  }
}
