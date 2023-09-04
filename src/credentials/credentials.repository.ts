import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import Cryptr from 'cryptr';

@Injectable()
export class CredentialsRepository {

    private SALT = 10;
    constructor(private readonly prisma: PrismaService) { }
    private cryptoSecret = process.env.CRYPTR_SECRET;
    private cryptr = new Cryptr(this.cryptoSecret);
    async create(credentialsDto: CreateCredentialDto, userId: number) {
        const encryptedPassword = this.cryptr.encrypt(credentialsDto.password);
        const result = await this.prisma.credential.create({
            data: {
                url: credentialsDto.url,
                username: credentialsDto.username,
                password: encryptedPassword,
                name: credentialsDto.name,
                userId
            }
        })
        return result
    }

    async findAll(userId: number) {
        const result = await this.prisma.credential.findMany({
            where: { userId },
        })
        const decrypt = result.map((credential) => {
            const decryptedPassword = this.cryptr.decrypt(credential.password);
            return {
                ...credential,
                password: decryptedPassword,
            };
        })
        return decrypt
    }

    getByUserId(userId: number, name: string) {
        return this.prisma.credential.findFirst({
            where: {
                userId,
                name
            },
        })
    }

    async getById(id: number) {
        const result = await this.prisma.credential.findUnique({
            where: { id }
        })
        if (result) {
            return {
                ...result,
                password: this.cryptr.decrypt(result.password)
            }
        }
        else return null

    }

    async remove(id: number) {
        return this.prisma.credential.delete({
            where: { id }
        })
    }
}