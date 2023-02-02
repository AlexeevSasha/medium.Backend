import { UserType } from './user';

export interface IUserResponse {
  user: UserType & { token: string };
}
