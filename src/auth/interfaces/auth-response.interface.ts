import { UserModel } from 'src/users/schemas'

interface IUser extends Partial<UserModel> {
  role: string
}

export interface IAuthResponse {
  message: string
  access_token: string
  refresh_token?: UserModel['refresh_token']
  user: IUser
}
