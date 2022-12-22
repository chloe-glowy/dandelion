import { CreateUserInteractorArgs } from 'src/server/interactors/user/create/types/CreateUserInteractorTypes';
import { UserPresenter } from 'src/server/presenters/public/user/UserPresenter';

export type CreateUserControllerArgs = CreateUserInteractorArgs;

export type CreateUserControllerResult = Readonly<{
  user: UserPresenter;
}>;
