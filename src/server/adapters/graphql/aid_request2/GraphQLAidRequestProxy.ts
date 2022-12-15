import { GraphQLAidRequestProperties } from 'src/server/adapters/graphql/aid_request2/GraphQLAidRequestTypes2';
import { GraphQLAidRequestActionOptionProxy } from 'src/server/adapters/graphql/aid_request_action_option/GraphQLAidRequestActionOptionProxy';
import { GraphQLAidRequestActionOptionProperties } from 'src/server/adapters/graphql/aid_request_action_option/GraphQLAidRequestActionOptionTypes';
import { GraphQLAidRequestHistoryEventProxy } from 'src/server/adapters/graphql/aid_request_history_event/GraphQLAidRequestHistoryEventProxy';
import { GraphQLAidRequestHistoryEventProperties } from 'src/server/adapters/graphql/aid_request_history_event/GraphQLAidRequestHistoryEventTypes';
import { GraphQLAidRequestStatusSummaryProxy } from 'src/server/adapters/graphql/aid_request_status_summary/GraphQLAidRequestStatusSummaryProxy';
import { GraphQLAidRequestStatusSummaryProperties } from 'src/server/adapters/graphql/aid_request_status_summary/GraphQLAidRequestStatusSummaryTypes';
import { GraphQLSharingGroupProxy } from 'src/server/adapters/graphql/sharing_group/GraphQLSharingGroupProxy';
import { GraphQLUserProxy } from 'src/server/adapters/graphql/user2/GraphQLUserProxy';
import { AidRequestPresenter } from 'src/server/presenters/public/aid_request/AidRequestPresenter';

export class GraphQLAidRequestProxy implements GraphQLAidRequestProperties {
  constructor(public readonly aidRequest: AidRequestPresenter) {}

  public async id(): Promise<string> {
    return await this.aidRequest.getID();
  }

  public async completed(): Promise<boolean> {
    return await this.aidRequest.getIsCompleted();
  }

  public async createdAt(): Promise<Date> {
    return await this.aidRequest.getDateCreated();
  }

  public async lastUpdated(): Promise<Date> {
    return await this.aidRequest.getDateLastUpdated();
  }

  public async actionsAvailable(): Promise<
    ReadonlyArray<GraphQLAidRequestActionOptionProperties>
  > {
    try {
      const actionPresenters = await this.aidRequest.getActionsAvailable();
      return actionPresenters.map(
        (_) => new GraphQLAidRequestActionOptionProxy(_),
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async activity(): Promise<
    ReadonlyArray<GraphQLAidRequestHistoryEventProperties>
  > {
    const activityItems = await this.aidRequest.getHistory();
    return activityItems.map((_) => new GraphQLAidRequestHistoryEventProxy(_));
  }

  public async latestEvent(): Promise<string> {
    return await this.aidRequest.getLatestEventSummary();
  }

  public async sharingGroup(): Promise<GraphQLSharingGroupProxy | null> {
    const sharingGroup = await this.aidRequest.getSharingGroup();
    return sharingGroup == null
      ? null
      : new GraphQLSharingGroupProxy(sharingGroup);
  }

  public async status(): Promise<GraphQLAidRequestStatusSummaryProperties> {
    return new GraphQLAidRequestStatusSummaryProxy(
      await this.aidRequest.getStatusSummary(),
    );
  }

  public async whatIsNeeded(): Promise<string> {
    return await this.aidRequest.getWhatIsNeeded();
  }

  public async whoIsItFor(): Promise<string> {
    return await this.aidRequest.getWhoIsItFor();
  }

  public async whoIsWorkingOnItUsers(): Promise<
    ReadonlyArray<GraphQLUserProxy>
  > {
    const users = await this.aidRequest.getWhoIsWorkingOnIt();
    return users.map((user) => new GraphQLUserProxy(user));
  }

  public async whoRecordedIt(): Promise<GraphQLUserProxy | null> {
    const user = await this.aidRequest.getWhoRecordedIt();
    return user == null ? null : new GraphQLUserProxy(user);
  }
}
