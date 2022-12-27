import { TestUserInMemoryDatabaseRow } from 'src/server/tests/application/mocks/db/user/TestUserInMemoryDatabaseRow';

export class TestUserInMemoryDatabase {
  private readonly users: Map<string, TestUserInMemoryDatabaseRow> = new Map();

  public get(id: string): TestUserInMemoryDatabaseRow | undefined {
    return this.users.get(id);
  }

  public set(id: string, row: TestUserInMemoryDatabaseRow): void {
    this.users.set(id, row);
  }
}
