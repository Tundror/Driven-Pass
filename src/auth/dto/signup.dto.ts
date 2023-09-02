import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";
export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}