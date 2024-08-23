import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common'
import { Request } from 'express'
import { JwtAuthGuard, RolesGuard } from 'src/common/guards'
import { Roles } from 'src/common/decorators'
import { UserModel } from './schemas'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto'
import { IUserResponse } from './interfaces'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUser(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUserResponse> {
    const user = req.user as UserModel

    return await this.usersService.updateUser({
      userId: user.id,
      updateUserDto,
    })
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Req() req: Request): Promise<IUserResponse> {
    const user = req.user as UserModel

    return await this.usersService.deleteUser(user)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async findAll(): Promise<UserModel[]> {
    return await this.usersService.findAll()
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserModel> {
    return await this.usersService.findOne(id)
  }
}
