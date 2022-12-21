import { CC } from 'src/server/context_container/public/ContextContainer';
import { User } from 'src/server/entities/public/user/User';
import {
  CreateUserInteractorArgs,
  CreateUserInteractorResult,
} from 'src/server/interactors/user/create/types/CreateUserInteractorTypes';

export abstract class CreateUserInteractor {
  public static async execute(
    cc: CC,
    args: CreateUserInteractorArgs,
  ): Promise<CreateUserInteractorResult> {
    const user = await User.create(cc, args);
    return { user };
  }
}
