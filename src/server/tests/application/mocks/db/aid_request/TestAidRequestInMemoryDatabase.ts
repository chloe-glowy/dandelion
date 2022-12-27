import { TestAidRequestInMemoryDatabaseRow } from 'src/server/tests/application/mocks/db/aid_request/TestAidRequestInMemoryDatabaseRow';

export class TestAidRequestInMemoryDatabase {
  public readonly aidRequests: Map<string, TestAidRequestInMemoryDatabaseRow> =
    new Map();

  public get(id: string): TestAidRequestInMemoryDatabaseRow | undefined {
    return this.aidRequests.get(id);
  }

  public set(id: string, row: TestAidRequestInMemoryDatabaseRow): void {
    this.aidRequests.set(id, row);
  }
}
