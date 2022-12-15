import { ContextModule } from 'src/server/context_container/public/ContextContainer';
import { User } from 'src/server/entities/public/user/User';

export interface ViewerContext {
  readonly isSystem: boolean;
  readonly user: User | null;
  isSameUser(user: User | null): Promise<boolean>;
}

export class VC extends ContextModule {
  private vc_: ViewerContext | undefined;

  public get vc(): ViewerContext {
    if (this.vc_ == null) {
      throw new Error('Expected vc to be set');
    }
    return this.vc_;
  }

  public setViewerContext(vc: ViewerContext): void {
    if (this.vc_ != null) {
      throw new Error('Attempted to set viewer context twice');
    }
    this.vc_ = vc;
  }
}

export class SystemViewerContext implements ViewerContext {
  public readonly isSystem = true;
  public readonly user: null = null;
  async isSameUser(_user: null | User): Promise<boolean> {
    // System is never the same as any user because it's not a user
    return false;
  }
}

export class UserViewerContext implements ViewerContext {
  public readonly isSystem = false;
  constructor(public readonly user: User) {}
  async isSameUser(user: null | User): Promise<boolean> {
    if (user === null) {
      return false;
    }
    return await this.user.isSameUser(user);
  }
}

export class LoggedOutViewerContext implements ViewerContext {
  public readonly isSystem = false;
  public readonly user: null = null;
  async isSameUser(_user: null | User): Promise<boolean> {
    // Logged out is never the same as any user because it's not a user
    return false;
  }
}
