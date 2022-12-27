import { TestSharingGroupInMemoryDatabaseRow } from 'src/server/tests/application/mocks/db/sharing_group/TestSharingGroupInMemoryDatabaseRow';

export class TestSharingGroupInMemoryDatabase {
  private sharingGroups: Map<string, TestSharingGroupInMemoryDatabaseRow> =
    new Map();

  public get(id: string): TestSharingGroupInMemoryDatabaseRow | undefined {
    return this.sharingGroups.get(id);
  }

  public set(id: string, row: TestSharingGroupInMemoryDatabaseRow): void {
    this.sharingGroups.set(id, row);
  }
}
