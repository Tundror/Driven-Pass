import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Cryptr from 'cryptr';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsRepository {

    private SALT = 10;
    constructor(private readonly prisma: PrismaService) { }
    private cryptoSecret = process.env.CRYPTR_SECRET;
    private cryptr = new Cryptr(this.cryptoSecret);
    create(CreateCardDto: CreateCardDto, userId: number) {
        const encryptedNumber = this.cryptr.encrypt(CreateCardDto.number.toString());
        const encryptedCvv = this.cryptr.encrypt(CreateCardDto.cvv.toString());
        return this.prisma.card.create({
            data: {
                name: CreateCardDto.name,
                cvv: encryptedCvv,
                expiration: CreateCardDto.expiration,
                nameOnCard: CreateCardDto.nameOnCard,
                number: encryptedNumber,
                type: CreateCardDto.type,
                virtual: CreateCardDto.virtual,
                userId
            }
        })
    }

    async findAll(userId: number) {
        const result = await this.prisma.card.findMany({
            where: { userId },
        })
        const decrypt = result.map((card) => {
            const decryptedNumber = this.cryptr.decrypt(card.number);
            const decryptedCvv = this.cryptr.decrypt(card.cvv);
            return {
                ...card,
                number: decryptedNumber,
                cvv: decryptedCvv
            };
        })
        return decrypt
    }

    getByUserId(userId: number, name: string) {
        return this.prisma.card.findFirst({
            where: {
                userId,
                name
            },
        })
    }

    async getById(id: number) {
        const result = await this.prisma.card.findUnique({
            where: { id }
        })
        if (result) {
            return {
                ...result,
                number: this.cryptr.decrypt(result.number),
                cvv: this.cryptr.decrypt(result.cvv)
            }
        }
        else return null

    }

    async remove(id: number) {
        return this.prisma.card.delete({
            where: { id }
        })
    }
}