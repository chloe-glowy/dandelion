import { TestUserInMemoryDatabaseRow } from 'src/server/tests/application/mocks/db/user/TestUserInMemoryDatabaseRow';

export abstract class TestUserInMemoryDatabase {
  private static users: Map<string, TestUserInMemoryDatabaseRow> = new Map();

  public static get(id: string): TestUserInMemoryDatabaseRow | undefined {
    return this.users.get(id);
  }

  public static set(id: string, row: TestUserInMemoryDatabaseRow): void {
    this.users.set(id, row);
  }
}
