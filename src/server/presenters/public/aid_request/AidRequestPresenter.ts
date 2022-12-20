import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { AidRequestViewAvailableActionOptionsUseCase } from 'src/server/interactors/view_aid_request/AidRequestViewAvailableActionOptionsUseCase';
import { AidRequestViewHistoryOldestToNewestUseCase } from 'src/server/interactors/view_aid_request/AidRequestViewHistoryOldestToNewestUseCase';
import { AidRequestActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/AidRequestActionOptionPresenter';
import { AidRequestActionOptionPresenterFactory } from 'src/server/presenters/public/aid_request_action_option/AidRequestActionOptionPresenterFactory';
import { AidRequestHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/AidRequestHistoryEventPresenter';
import { AidRequestHistoryEventPresenterFactory } from 'src/server/presenters/public/aid_request_history_event/AidRequestHistoryEventPresenterFactory';
import { AidRequestStatusSummaryPresenter } from 'src/server/presenters/public/aid_request_status_summary/AidRequestStatusSummaryPresenter';
import { SharingGroupPresenter } from 'src/server/presenters/public/sharing_group/SharingGroupPresenter';
import { UserPresenter } from 'src/server/presenters/public/user/UserPresenter';

export class AidRequestPresenter {
  public static async load(
    cc: CC,
    id: string,
  ): Promise<AidRequestPresenter | null> {
    const aidRequest = await AidRequest.load(cc, id);
    return aidRequest == null ? null : new AidRequestPresenter(cc, aidRequest);
  }

  constructor(private cc: CC, private aidRequest: AidRequest) {}

  public async getID(): Promise<string> {
    return this.aidRequest.id;
  }

  public async getIsCompleted(): Promise<boolean> {
    return await this.aidRequest.getIsCompleted();
  }

  public async getDateCreated(): Promise<Date> {
    return await this.aidRequest.getDateCreated();
  }

  public async getDateLastUpdated(): Promise<Date> {
    return await this.aidRequest.getDateLastUpdated();
  }

  public async getActionsAvailable(): Promise<
    ReadonlyArray<AidRequestActionOptionPresenter>
  > {
    const actions = await AidRequestViewAvailableActionOptionsUseCase.get(
      this.cc,
      this.aidRequest,
    );
    return actions.map(AidRequestActionOptionPresenterFactory.create);
  }

  public async getHistory(): Promise<
    ReadonlyArray<AidRequestHistoryEventPresenter>
  > {
    const historyItemsNewestToOldest =
      await AidRequestViewHistoryOldestToNewestUseCase.get(this.aidRequest);
    return historyItemsNewestToOldest.map(
      AidRequestHistoryEventPresenterFactory.create,
    );
  }

  public async getLatestEventSummary(): Promise<string> {
    const latestEvent = await this.aidRequest.getLatestEvent();
    const latestEventPresenter =
      AidRequestHistoryEventPresenterFactory.create(latestEvent);
    return await latestEventPresenter.getSummary();
  }

  public async getSharingGroup(): Promise<SharingGroupPresenter | null> {
    const sharingGroup = await this.aidRequest.getSharingGroup();
    return sharingGroup == null
      ? null
      : new SharingGroupPresenter(this.cc, sharingGroup);
  }

  public async getStatusSummary(): Promise<AidRequestStatusSummaryPresenter> {
    if (await this.aidRequest.getIsCompleted()) {
      return new AidRequestStatusSummaryPresenter('Completed', []);
    }
    const people = await this.aidRequest.getWhoIsWorkingOnIt();
    switch (people.length) {
      case 0:
        return new AidRequestStatusSummaryPresenter(
          'No one is working on it yet',
          [],
        );
      case 1:
        return await (async () => {
          const name1 = await people[0].getDisplayName();
          return new AidRequestStatusSummaryPresenter(
            `${name1} is working on it`,
            people,
          );
        })();
      case 2:
        return await (async () => {
          const [name1, name2] = await Promise.all(
            people.slice(0, 2).map((user) => user.getDisplayName),
          );
          return new AidRequestStatusSummaryPresenter(
            `${name1} and ${name2} are working on it`,
            people,
          );
        })();
      default:
        return await (async () => {
          return new AidRequestStatusSummaryPresenter(
            `${people.length} people are working on it`,
            people,
          );
        })();
    }
  }

  public async getWhatIsNeeded(): Promise<string> {
    return await this.aidRequest.getWhatIsNeeded();
  }

  public async getWhoIsItFor(): Promise<string> {
    return await this.aidRequest.getWhoIsItFor();
  }

  public async getWhoIsWorkingOnIt(): Promise<ReadonlyArray<UserPresenter>> {
    const users = await this.aidRequest.getWhoIsWorkingOnIt();
    return users.map((user) => new UserPresenter(user));
  }

  public async getWhoRecordedIt(): Promise<UserPresenter | null> {
    const user = await this.aidRequest.getWhoRecordedIt();
    return user == null ? null : new UserPresenter(user);
  }
}
