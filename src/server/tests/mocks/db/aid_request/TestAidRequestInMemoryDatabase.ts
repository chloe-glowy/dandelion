import { TestAidRequestInMemoryDatabaseRow } from 'src/server/tests/mocks/db/aid_request/TestAidRequestInMemoryDatabaseRow';

export abstract class TestAidRequestInMemoryDatabase {
  private static aidRequests: Map<string, TestAidRequestInMemoryDatabaseRow> =
    new Map();

  public static get(id: string): TestAidRequestInMemoryDatabaseRow | undefined {
    return this.aidRequests.get(id);
  }

  public static set(id: string, row: TestAidRequestInMemoryDatabaseRow): void {
    this.aidRequests.set(id, row);
  }
}
