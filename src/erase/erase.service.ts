import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EraseDto } from './dto/erase.dto';
import { User } from '@prisma/client';
import * as bcrypt from "bcrypt"
import { EraseRepository } from './erase.repository';

@Injectable()
export class EraseService {
  constructor(private readonly repository: EraseRepository) {}

  async remove(user: User, EraseDto: EraseDto) {
    const checkUser = await this.repository.findUserById(user.id)
    if(!checkUser) throw new NotFoundException("Usuario nao encontrado")

    const valid = await bcrypt.compare(EraseDto.password, checkUser.password)
    if (!valid) throw new UnauthorizedException("Senha invalida.")

    return await this.repository.remove(user.id);
  }
}

// async signIn(signInDto: SignInDto) {

//   const user = await this.userService.findUserByEmail(signInDto.email)
//   if (!user) throw new UnauthorizedException("Email ou senha invalidos.");

//   const valid = await bcrypt.compare(signInDto.password, user.password);
//   if (!valid) throw new UnauthorizedException("Email ou senha invalidos.");

//   return this.createToken(user);
// }
