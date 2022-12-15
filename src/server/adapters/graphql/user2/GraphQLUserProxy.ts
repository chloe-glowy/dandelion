import { GraphQLUserProperties } from 'src/server/adapters/graphql/user2/GraphQLUserTypes';
import { UserPresenter } from 'src/server/presenters/public/user/UserPresenter';

export class GraphQLUserProxy implements GraphQLUserProperties {
  constructor(public readonly user: UserPresenter) {}

  public async id(): Promise<string> {
    return await this.user.getID();
  }

  public async displayName(): Promise<string> {
    return await this.user.getDisplayName();
  }
}
