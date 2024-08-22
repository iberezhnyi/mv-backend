import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { Request } from 'express'
import { JwtAuthGuard } from 'src/common/guards'
import { UserModel } from 'src/users/schemas'
import { NotesService } from './notes.service'
import { CreateNoteDto, UpdateNoteDto } from './dto'
import { INoteResponse } from './interfaces'

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createNote(
    @Body() createData: CreateNoteDto,
    @Req() req: Request,
  ): Promise<INoteResponse> {
    const user = req.user as UserModel

    return await this.notesService.createNote({ user, createData })
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateNote(
    @Param('id') id: string,
    @Body() updateData: UpdateNoteDto,
    @Req() req: Request,
  ): Promise<INoteResponse> {
    const user = req.user as UserModel

    return await this.notesService.updateNote({
      user,
      noteId: id,
      updateData,
    })
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteNote(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<INoteResponse> {
    const user = req.user as UserModel

    return await this.notesService.deleteNote({ noteId: id, user })
  }
}
