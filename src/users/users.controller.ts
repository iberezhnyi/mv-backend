import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto'
import { UserModel } from './schemas'
import { JwtAuthGuard, RolesGuard } from 'src/common/guards'
import { Roles } from 'src/common/decorators'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  findAll(): Promise<UserModel[]> {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id)
  }
}
