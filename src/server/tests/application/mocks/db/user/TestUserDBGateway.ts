import { CC } from 'src/server/context_container/public/ContextContainer';
import { AuthenticatedUserID } from 'src/server/entities/public/user/AuthenticatedUserID';
import { UserCreateArgs } from 'src/server/entities/public/user/mutations/UserCreate';
import { UserDBGatewayType } from 'src/server/entities/public/user/plugins/interfaces/UserDBGatewayType';
import { UserDBProxy } from 'src/server/entities/public/user/plugins/interfaces/UserDBProxy';
import { User } from 'src/server/entities/public/user/User';
import { TestUserDBProxy } from 'src/server/tests/application/mocks/db/user/TestUserDBProxy';
import { TestUserInMemoryDatabase } from 'src/server/tests/application/mocks/db/user/TestUserInMemoryDatabase';
import { TestUserInMemoryDatabaseRow } from 'src/server/tests/application/mocks/db/user/TestUserInMemoryDatabaseRow';
import { TestID } from 'src/server/tests/application/mocks/TestID';

export class TestUserDBGateway implements UserDBGatewayType {
  public readonly db: TestUserInMemoryDatabase = new TestUserInMemoryDatabase();

  async load(id: string): Promise<UserDBProxy | null> {
    const testUserInMemoryDatabaseRow = this.db.get(id);
    if (testUserInMemoryDatabaseRow == null) {
      return null;
    }
    return new TestUserDBProxy(testUserInMemoryDatabaseRow);
  }

  async create(cc: CC, args: UserCreateArgs): Promise<User> {
    const id = TestID.create('user');
    const row = new TestUserInMemoryDatabaseRow({
      displayName: args.displayName,
      id,
      sharingGroupIDs: [],
    });
    this.db.set(id, row);

    const user = await User.loadViewer(
      cc,
      new TestUserDBGatewayAuthenticatedID(id),
    );
    if (user == null) {
      throw new Error('Failed to create or load user');
    }
    return user;
  }
}

class TestUserDBGatewayAuthenticatedID implements AuthenticatedUserID {
  constructor(public readonly id: string | null) {}

  get isSystem(): boolean {
    return false;
  }
}
