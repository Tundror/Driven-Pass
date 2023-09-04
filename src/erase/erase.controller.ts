import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { EraseService } from './erase.service';
import { EraseDto } from './dto/erase.dto';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { AuthGuard } from '../guards/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("erase")
@UseGuards(AuthGuard)
@Controller('erase')
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}

  @Post()
  @ApiOperation({summary: "Erase user account"})
  @ApiResponse({status: HttpStatus.CREATED, description: "Successfully erased account"})
  erase(@Body() EraseDto: EraseDto,  @User() user: UserPrisma) {
    return this.eraseService.remove(user, EraseDto);
  }
}
