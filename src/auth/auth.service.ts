import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    private EXPIRATION_TIME = "7 days";
    private ISSUER = "DrivenPass";
    private AUDIENCE = "users";

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService) { }

    async signUp(signUpDto: SignUpDto) {
        return await this.userService.create(signUpDto)
    }

    async signIn(signInDto: SignInDto) {

        const user = await this.userService.findUserByEmail(signInDto.email)
        if (!user) throw new UnauthorizedException("Email ou senha invalidos.");

        const valid = await bcrypt.compare(signInDto.password, user.password);
        if (!valid) throw new UnauthorizedException("Email ou senha invalidos.");

        return this.createToken(user);
    }

    createToken(user: User) {
        const { id, email } = user;

        const token = this.jwtService.sign({ email, id }, {
            expiresIn: this.EXPIRATION_TIME,
            subject: String(id),
            issuer: this.ISSUER,
            audience: this.AUDIENCE
        })

        return { token };
    }

    checkToken(token: string) {
        const data = this.jwtService.verify(token, {
            audience: this.AUDIENCE,
            issuer: this.ISSUER
        });

        return data;
    }
}
