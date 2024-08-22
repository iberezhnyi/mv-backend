import { UserModel } from 'src/users/schemas'
import { RegisterUserDto } from '../dto'
import { Response } from 'express'

interface IUser extends Partial<UserModel> {
  role: string
}

export interface IAuthTokens {
  access_token: string
  refresh_token: string
}

export interface IAuthRegister {
  userData: RegisterUserDto
  res: Response
}

export interface IAuthParams {
  user: UserModel
  res: Response
}

export interface IAuthResponse {
  message: string
  access_token: string
  user: IUser
}

export interface IProfileResponse {
  message: string
  user: IUser
}

export interface IRefreshResponse {
  message: string
  access_token: string
}

export interface ILogoutResponse {
  message: string
}
