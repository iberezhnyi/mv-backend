import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common'
import { NotesService } from './notes.service'

import { JwtAuthGuard } from 'src/common/guards'
import { Request as IRequest } from 'express'
import { CreateNoteDto } from './dto'
import { UserModel } from 'src/users/schemas'

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createNote(@Body() noteData: CreateNoteDto, @Request() req: IRequest) {
    return this.notesService.createNote(noteData, req.user as UserModel)
  }
}
