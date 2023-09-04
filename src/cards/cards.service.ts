import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardsRepository } from './cards.repository';
import { User } from '@prisma/client';

@Injectable()
export class CardsService {
  constructor(private readonly repository: CardsRepository) {}

  async create(createCardDto: CreateCardDto, userId: number) {
    const checkName = await this.repository.getByUserId(userId, createCardDto.name)
    if (checkName) throw new ConflictException("O titulo do cartao deve ser unico!")
    return await this.repository.create(createCardDto, userId)
  }

  async findAll(userId: number) {
    return await this.repository.findAll(userId)
  }

  async findOne(id: number, user: User) {
    const result = await this.repository.getById(id)
    if (!result) throw new NotFoundException("Cartao nao encontrado")
    if (result.userId !== user.id) throw new ForbiddenException("Cartao pertence a outro usuario")
    return result
  }

  async remove(id: number, user: User) {
    const result = await this.repository.getById(id)
    if (!result) throw new NotFoundException("Cartao nao encontrado")
    if (result.userId !== user.id) throw new ForbiddenException("Cartao pertence a outro usuario")
    return await this.repository.remove(id);
  }
}
