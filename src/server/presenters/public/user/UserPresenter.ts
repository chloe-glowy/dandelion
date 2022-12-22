import { CC } from 'src/server/context_container/public/ContextContainer';
import { User } from 'src/server/entities/public/user/User';

export class UserPresenter {
  constructor(private readonly cc: CC, private readonly user: User) {}

  public async getID(): Promise<string> {
    return await this.user.getID();
  }

  public async getDisplayName(): Promise<string> {
    return await this.user.getDisplayName();
  }

  public async getIsViewer(): Promise<boolean> {
    return await this.user.getIsViewer();
  }
}
