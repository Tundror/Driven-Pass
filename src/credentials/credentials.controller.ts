import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("credentials")
@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  @ApiOperation({summary: "Create credential for user"})
  @ApiResponse({status: HttpStatus.CREATED, description: "Successfully created credentials"})
  create(@Body() createCredentialDto: CreateCredentialDto,  @User() user: UserPrisma) {
    return this.credentialsService.create(createCredentialDto, +user.id);
  }

  @Get()
  @ApiOperation({summary: "Get credentials from user"})
  @ApiResponse({status: HttpStatus.OK, description: "Successfully got credentials"})
  findAll(@User() user: UserPrisma) {
    return this.credentialsService.findAll(+user.id);
  }

  @Get(':id')
  @ApiOperation({summary: "Get credential from user"})
  @ApiResponse({status: HttpStatus.OK, description: "Successfully got credential"})
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    return this.credentialsService.findOne(+id, user);
  }

  @Delete(':id')
  @ApiOperation({summary: "Delete credential from user"})
  @ApiResponse({status: HttpStatus.OK, description: "Successfully deleted credential"})
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    return this.credentialsService.remove(+id, user);
  }
}
