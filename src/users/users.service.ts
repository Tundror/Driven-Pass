import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.getUserByEmail(createUserDto.email)
    if (user) throw new ConflictException("E-mail ja esta em uso")

    return await this.usersRepository.create(createUserDto)
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.getById(id)
    if (!user) throw new NotFoundException("Usuario nao encontrado");
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.getUserByEmail(email)
  }

}
