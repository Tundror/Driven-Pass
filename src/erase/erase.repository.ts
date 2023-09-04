import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EraseRepository {

    constructor(private readonly prisma: PrismaService) { }

    async remove(userId: number) {
        await this.prisma.credential.deleteMany({
            where: { userId }
        })
        await this.prisma.card.deleteMany({
            where: { userId }
        })
        await this.prisma.note.deleteMany({
            where: { userId }
        })
        await this.prisma.user.delete({
            where: { id: userId }
        })
        return "Your account has been terminated"
    }

    findUserById(userId: number) {
        return this.prisma.user.findFirst({
            where: { id: userId }
        })
    }
}