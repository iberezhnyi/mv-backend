import { UserModel } from 'src/users/schemas'

interface IUser extends Partial<UserModel> {}

export interface IAuthResponse {
  message: string
  access_token: UserModel['access_token']
  user: IUser
}
