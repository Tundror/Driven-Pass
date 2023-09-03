import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Global()
@Module({
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
  imports: [PrismaModule]
})
export class UsersModule {}
