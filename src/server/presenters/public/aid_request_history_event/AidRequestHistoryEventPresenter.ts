import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { UserPresenter } from 'src/server/presenters/public/user/UserPresenter';
import ago from 'src/shared/presenter_utils/ago';

export abstract class AidRequestHistoryEventPresenter {
  protected abstract event: AidRequestHistoryEvent;

  public async getID(): Promise<string> {
    return await this.event.getID();
  }

  public async getActor(): Promise<UserPresenter | null> {
    const user = await this.event.getActor();
    return user == null ? null : new UserPresenter(this.event.cc, user);
  }

  public async getWhenDidItHappenText(): Promise<string> {
    const timestamp = await this.event.getTimestamp();
    return ago(timestamp);
  }

  public abstract getMessage(): Promise<string>;

  public async getSummary(): Promise<string> {
    const [actorSummaryName, whenDidItHappenText, shortSummaryVerb] =
      await Promise.all([
        await this.getActorSummaryName(),
        await this.getWhenDidItHappenText(),
        await this.getShortSummaryVerb(),
      ]);
    return `${whenDidItHappenText} - ${actorSummaryName} ${shortSummaryVerb}`;
  }

  protected abstract getShortSummaryVerb(): Promise<string>;

  private async getActorSummaryName(): Promise<string> {
    const actor = await this.getActor();
    const actorIsViewer = await actor?.getIsViewer();
    if (actorIsViewer) {
      return 'You';
    } else if (actor == null) {
      return 'Someone';
    } else {
      return await actor.getDisplayName();
    }
  }

  /**
   * TODO -- Is there a better way to do this, rather than defining this here
   * and overriding it in the Comment event presenter? Does this interface
   * (AidRequestHistoryEventPresenter) event *need* to have a getIsComment method?
   *
   * The purpose is to allow the UI to render it differently if it's a comment.
   * Specifically the *only* thing that's used for is the opacity and italic-ness.
   * If it's a comment, we have opacity 1 and don't use italics. If it's not a comment,
   * we have opacity 0.6 and use italics.
   *
   * Should I just move these (opacity and italics) up to the presenter on the server??
   */
  public async getIsComment(): Promise<boolean> {
    return false;
  }
}
