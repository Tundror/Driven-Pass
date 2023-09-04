import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("notes")
@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({summary: "Create note"})
  @ApiResponse({status: HttpStatus.CREATED, description: "Successfully created note"})
  create(@Body() createNoteDto: CreateNoteDto, @User() user: UserPrisma) {
    return this.notesService.create(createNoteDto, +user.id);
  }

  @Get()
  @ApiOperation({summary: "Get notes"})
  @ApiResponse({status: HttpStatus.OK, description: "Successfully got notes"})
  findAll(@User() user: UserPrisma) {
    return this.notesService.findAll(+user.id);
  }

  @Get(':id')
  @ApiOperation({summary: "Get note"})
  @ApiResponse({status: HttpStatus.OK, description: "Successfully got note"})
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    return this.notesService.findOne(+id, user);
  }

  @Delete(':id')
  @ApiOperation({summary: "Delete note"})
  @ApiResponse({status: HttpStatus.OK, description: "Successfully deleted note"})
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    return this.notesService.remove(+id, user);
  }
}
