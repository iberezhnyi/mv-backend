import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { NotesService } from './notes.service'

import { JwtAuthGuard } from 'src/common/guards'
import { Request as IRequest } from 'express'
import { CreateNoteDto, UpdateNoteDto } from './dto'
import { INoteResponse, INoteUpdate } from './interfaces'

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createNote(
    @Body() noteData: CreateNoteDto,
    @Request() req: IRequest,
  ): Promise<INoteResponse> {
    return await this.notesService.createNote({
      noteData,
      user: req.user,
    } as INoteUpdate)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateNote(
    @Param('id') id: string,
    @Body() updateNoteData: UpdateNoteDto,
    @Request() req: IRequest,
  ): Promise<INoteResponse> {
    return await this.notesService.updateNote({
      noteId: id,
      noteData: updateNoteData,
      user: req.user,
    } as INoteUpdate)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteNote(
    @Param('id') id: string,
    @Request() req: IRequest,
  ): Promise<INoteResponse> {
    return await this.notesService.deleteNote({
      noteId: id,
      user: req.user,
    } as INoteUpdate)
  }
}
