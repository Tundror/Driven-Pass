import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesRepository {

    constructor(private readonly prisma: PrismaService) { }

    create(CreateNoteDto: CreateNoteDto, userId: number) {
        return this.prisma.note.create({
            data: {
                name: CreateNoteDto.name,
                text: CreateNoteDto.text,
                userId
            }
        })
    }

    findAll(userId: number) {
        return this.prisma.note.findMany({
            where: { userId },
        })
    }

    getByUserId(userId: number, name: string) {
        return this.prisma.note.findFirst({
            where: {
                userId,
                name
            },
        })
    }

    getById(id: number) {
        return this.prisma.note.findUnique({
            where: { id }
        })

    }

    remove(id: number) {
        return this.prisma.note.delete({
            where: { id }
        })
    }
}