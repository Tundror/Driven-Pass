import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EraseService } from './erase.service';
import { EraseDto } from './dto/erase.dto';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('erase')
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}

  @Post()
  erase(@Body() EraseDto: EraseDto,  @User() user: UserPrisma) {
    return this.eraseService.remove(user, EraseDto);
  }
}
