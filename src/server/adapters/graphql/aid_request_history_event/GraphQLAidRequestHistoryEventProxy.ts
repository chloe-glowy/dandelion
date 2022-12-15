import { GraphQLAidRequestHistoryEventProperties } from 'src/server/adapters/graphql/aid_request_history_event/GraphQLAidRequestHistoryEventTypes';
import { GraphQLUserProxy } from 'src/server/adapters/graphql/user2/GraphQLUserProxy';
import { AidRequestHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/AidRequestHistoryEventPresenter';

export class GraphQLAidRequestHistoryEventProxy
  implements GraphQLAidRequestHistoryEventProperties
{
  constructor(public readonly presenter: AidRequestHistoryEventPresenter) {}

  public async id(): Promise<string> {
    return await this.presenter.getID();
  }

  public async actor(): Promise<GraphQLUserProxy | null> {
    const actor = await this.presenter.getActor();
    return actor == null ? null : new GraphQLUserProxy(actor);
  }

  public async isComment(): Promise<boolean> {
    return await this.presenter.getIsComment();
  }

  public async message(): Promise<string> {
    return await this.presenter.getMessage();
  }

  public async when(): Promise<string> {
    return await this.presenter.getWhenDidItHappenText();
  }
}
