import { UserDBGatewayType } from 'src/server/entities/public/user/plugins/interfaces/UserDBGatewayType';
import { UserDBProxy } from 'src/server/entities/public/user/plugins/interfaces/UserDBProxy';
import { TestUserDBProxy } from 'src/server/tests/application/mocks/db/user/TestUserDBProxy';
import { TestUserInMemoryDatabase } from 'src/server/tests/application/mocks/db/user/TestUserInMemoryDatabase';

export class TestUserDBGateway implements UserDBGatewayType {
  async load(id: string): Promise<UserDBProxy> {
    const testUserInMemoryDatabaseRow = TestUserInMemoryDatabase.get(id);
    if (testUserInMemoryDatabaseRow == null) {
      throw new Error(`User with id ${id} not found`);
    }
    return new TestUserDBProxy(testUserInMemoryDatabaseRow);
  }
}
