import { GraphQLAidRequestStatusSummaryProperties } from 'src/server/adapters/graphql/aid_request_status_summary/GraphQLAidRequestStatusSummaryTypes';
import { GraphQLUserProxy } from 'src/server/adapters/graphql/user2/GraphQLUserProxy';
import { AidRequestStatusSummaryPresenter } from 'src/server/presenters/public/aid_request_status_summary/AidRequestStatusSummaryPresenter';

export class GraphQLAidRequestStatusSummaryProxy
  implements GraphQLAidRequestStatusSummaryProperties
{
  constructor(public readonly presenter: AidRequestStatusSummaryPresenter) {}

  public async message(): Promise<string> {
    return await this.presenter.getMessage();
  }

  public async users(): Promise<ReadonlyArray<GraphQLUserProxy>> {
    const users = await this.presenter.getUsers();
    return users.map((user) => new GraphQLUserProxy(user));
  }
}
