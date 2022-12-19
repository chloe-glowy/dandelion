import { TestSharingGroupInMemoryDatabaseRow } from 'src/server/tests/application/mocks/db/sharing_group/TestSharingGroupInMemoryDatabaseRow';

export abstract class TestSharingGroupInMemoryDatabase {
  private static sharingGroups: Map<
    string,
    TestSharingGroupInMemoryDatabaseRow
  > = new Map();

  public static get(
    id: string,
  ): TestSharingGroupInMemoryDatabaseRow | undefined {
    return this.sharingGroups.get(id);
  }

  public static set(
    id: string,
    row: TestSharingGroupInMemoryDatabaseRow,
  ): void {
    this.sharingGroups.set(id, row);
  }
}
