import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from '@prisma/client';
import { NotesRepository } from './notes.repository';

@Injectable()
export class NotesService {
  constructor(private readonly repository: NotesRepository) {}
 async create(createNoteDto: CreateNoteDto, userId: number) {
    const checkName = await this.repository.getByUserId(userId, createNoteDto.name)
    if(checkName) throw new ConflictException("O titulo da nota deve ser unico!")
    return await this.repository.create(createNoteDto, userId)
  }

  async findAll(userId: number) {
    return await this.repository.findAll(userId)
  }

  async findOne(id: number, user: User) {
    const result = await this.repository.getById(id)
    if (!result) throw new NotFoundException("Nota nao encontrada")
    if (result.userId !== user.id) throw new ForbiddenException("Nota pertence a outro usuario")
    return result
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  async remove(id: number, user: User) {
    const result = await this.repository.getById(id)
    if (!result) throw new NotFoundException("Nota nao encontrada")
    if (result.userId !== user.id) throw new ForbiddenException("Nota pertence a outro usuario")
    return await this.repository.remove(id);
  }
}
