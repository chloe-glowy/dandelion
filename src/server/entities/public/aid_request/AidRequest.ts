import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestCreateImpl } from 'src/server/entities/private/aid_request/mutations/AidRequestCreateImpl';
import { AidRequestEditImpl } from 'src/server/entities/private/aid_request/mutations/edit/AidRequestEditImpl';
import { AidRequestUndoImpl } from 'src/server/entities/private/aid_request/mutations/undo/AidRequestUndoImpl';
import { AidRequestCreateArgs } from 'src/server/entities/public/aid_request/mutations/AidRequestCreate';
import { AidRequestEditResponse } from 'src/server/entities/public/aid_request/mutations/AidRequestEdit';
import { AidRequestDBGateway } from 'src/server/entities/public/aid_request/plugins/AidRequestDBGateway';
import { AidRequestDBProxy } from 'src/server/entities/public/aid_request/plugins/interfaces/AidRequestDBProxy';
import { AidRequestPrivacyPolicy } from 'src/server/entities/public/aid_request/policy/AidRequestPrivacyPolicy';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { User } from 'src/server/entities/public/user/User';

export class AidRequest {
  public static async load(cc: CC, id: string): Promise<AidRequest | null> {
    const dbProxy = await AidRequestDBGateway.get().load(cc, id);
    if (dbProxy == null) {
      return null;
    }
    const aidRequest = new this(cc, id, dbProxy);
    const canSee = await AidRequestPrivacyPolicy.canSee(cc, aidRequest);
    return canSee ? aidRequest : null;
  }

  public static async create(
    cc: CC,
    args: AidRequestCreateArgs,
  ): Promise<AidRequest> {
    return await AidRequestCreateImpl.create(cc, args);
  }

  public async edit(
    cc: CC,
    action: AidRequestAction,
  ): Promise<AidRequestEditResponse> {
    return await AidRequestEditImpl.exec(cc, this, action, (actor) =>
      this.dbProxy.edit(action, actor),
    );
  }

  public async undo(cc: CC, historyEventID: string): Promise<void> {
    return await AidRequestUndoImpl.exec(cc, this, historyEventID, (actor) =>
      this.dbProxy.undo(historyEventID, actor),
    );
  }

  public async getWhatIsNeeded(): Promise<string> {
    return await this.dbProxy.getWhatIsNeeded();
  }

  public async getWhoIsItFor(): Promise<string> {
    return await this.dbProxy.getWhoIsItFor();
  }

  public async getSharingGroupID(): Promise<string> {
    return await this.dbProxy.getSharingGroupID();
  }

  public async getWhoRecordedIt(): Promise<User | null> {
    return await this.dbProxy.getWhoRecordedIt();
  }

  public async getIsCompleted(): Promise<boolean> {
    return await this.dbProxy.getIsCompleted();
  }

  public async getIsUserWorkingOn(user: User): Promise<boolean> {
    return await this.dbProxy.getIsUserWorkingOn(user);
  }

  public async getActivityHistory(): Promise<
    ReadonlyArray<AidRequestHistoryEvent>
  > {
    return await this.dbProxy.getActivityHistory();
  }

  public async getHistoryEvent(
    historyEventID: string,
  ): Promise<AidRequestHistoryEvent> {
    return await this.dbProxy.getHistoryEvent(historyEventID);
  }

  public async getLatestEvent(): Promise<AidRequestHistoryEvent> {
    return await this.dbProxy.getLatestEvent();
  }

  public async getDateCreated(): Promise<Date> {
    return await this.dbProxy.getDateCreated();
  }

  public async getDateLastUpdated(): Promise<Date> {
    return await this.dbProxy.getDateLastUpdated();
  }

  public async getSharingGroup(): Promise<SharingGroup | null> {
    return await this.dbProxy.getSharingGroup();
  }

  public async getWhoIsWorkingOnIt(): Promise<ReadonlyArray<User>> {
    return await this.dbProxy.getWhoIsWorkingOnIt();
  }

  private constructor(
    public readonly cc: CC,
    public readonly id: string,
    private readonly dbProxy: AidRequestDBProxy,
  ) {}
}
