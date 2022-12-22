import { CC } from 'src/server/context_container/public/ContextContainer';
import {
  CreateUserControllerArgs,
  CreateUserControllerResult,
} from 'src/server/controllers/user/create/types/CreateUserControllerTypes';
import { CreateUserInteractor } from 'src/server/interactors/user/create/CreateUserInteractor';
import { UserPresenter } from 'src/server/presenters/public/user/UserPresenter';

export abstract class CreateUserController {
  public static async execute(
    cc: CC,
    args: CreateUserControllerArgs,
  ): Promise<CreateUserControllerResult> {
    const { user } = await CreateUserInteractor.execute(cc, args);
    return { user: new UserPresenter(cc, user) };
  }
}
