import { UserDocument } from 'src/users/schemas'

interface IUser extends Partial<UserDocument> {}

export interface IAuthResponse {
  message: string
  access_token: string
  user: IUser
}
