import { User } from 'src/server/entities/public/user/User';

export type CreateUserInteractorArgs = Readonly<{
  displayName: string;
}>;

export type CreateUserInteractorResult = Readonly<{
  user: User;
}>;
