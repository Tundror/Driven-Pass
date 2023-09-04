import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User as UserPrisma } from '@prisma/client';
import { User } from '../decorators/user.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("cards")
@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({summary: "Create card"})
  @ApiResponse({status: HttpStatus.CREATED, description: "Successfully created card"})
  create(@Body() createCardDto: CreateCardDto,  @User() user: UserPrisma) {
    return this.cardsService.create(createCardDto, +user.id);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({summary: "Get cards from user"})
  @ApiResponse({status: HttpStatus.OK, description: "Successfully got cards"})
  findAll(@User() user: UserPrisma) {
    return this.cardsService.findAll(+user.id);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: "id", description: "card id", example: 1
  })
  @ApiOperation({summary: "Get card from user"})
  @ApiResponse({status: HttpStatus.OK, description: "Successfully got card"})
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    return this.cardsService.findOne(+id, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: "id", description: "card id", example: 1
  })
  @ApiOperation({summary: "Delete cards from user"})
  @ApiResponse({status: HttpStatus.OK, description: "Successfully deleted cards"})
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    return this.cardsService.remove(+id, user);
  }
}
