import { ObjectId } from 'mongodb';
import { UserModel } from 'src/server/adapters/mongodb/collections/user/UserModel';
import { MongodbUserDBProxy } from 'src/server/adapters/mongodb/user/MongodbUserDBProxy';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { UserCreateArgs } from 'src/server/entities/public/user/mutations/UserCreate';
import { UserDBGatewayType } from 'src/server/entities/public/user/plugins/interfaces/UserDBGatewayType';
import { UserDBProxy } from 'src/server/entities/public/user/plugins/interfaces/UserDBProxy';
import { User } from 'src/server/entities/public/user/User';

export class MongodbUserDBGateway implements UserDBGatewayType {
  async load(id: string): Promise<UserDBProxy> {
    const mongodbUser = await UserModel.findById(new ObjectId(id));
    if (mongodbUser == null) {
      throw new Error('User not found');
    }
    return new MongodbUserDBProxy(mongodbUser);
  }

  async create(cc: CC, args: UserCreateArgs): Promise<User> {
    cc;
    args;
    throw new Error('Not implemented');
  }
}
