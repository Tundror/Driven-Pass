import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { CredentialsRepository } from './credentials.repository';
import { User } from '@prisma/client';

@Injectable()
export class CredentialsService {
constructor(private readonly repository: CredentialsRepository) {}

  async create(createCredentialDto: CreateCredentialDto, userId: number) {
    const checkName = await this.repository.getByUserId(userId, createCredentialDto.name)
    if(checkName) throw new ConflictException("O titulo da credencial deve ser unico!")
    return await this.repository.create(createCredentialDto, userId)
  }

  async findAll(userId: number) {
    return await this.repository.findAll(userId)
  }

  async findOne(id: number, user: User) {
    const result = await this.repository.getById(id)
    if (!result) throw new NotFoundException("Credencial nao encontrada")
    if (result.userId !== user.id) throw new ForbiddenException("Credencial pertence a outro usuario")
    return result
  }

  async remove(id: number, user: User) {
    const result = await this.repository.getById(id)
    if (!result) throw new NotFoundException("Credencial nao encontrada")
    if (result.userId !== user.id) throw new ForbiddenException("Credencial pertence a outro usuario")
    return await this.repository.remove(id);
  }
}
