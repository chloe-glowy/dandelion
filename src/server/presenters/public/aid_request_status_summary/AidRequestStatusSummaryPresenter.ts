import { User } from 'src/server/entities/public/user/User';
import { UserPresenter } from 'src/server/presenters/public/user/UserPresenter';

export class AidRequestStatusSummaryPresenter {
  constructor(
    private readonly message: string,
    private readonly users: ReadonlyArray<User>,
  ) {}

  public async getMessage(): Promise<string> {
    return this.message;
  }

  public async getUsers(): Promise<ReadonlyArray<UserPresenter>> {
    return this.users.map((user) => new UserPresenter(user));
  }
}
