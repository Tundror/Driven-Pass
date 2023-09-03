import { CardType } from "@prisma/client";
import { IsBoolean, IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, isDate } from "class-validator";

export class CreateCardDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    number: string

    @IsNumber()
    @IsNotEmpty()
    cvv: string

    @IsDateString()
    @IsNotEmpty()
    expiration: Date

    @IsBoolean()
    @IsNotEmpty()
    virtual: boolean

    @IsEnum(CardType)
    @IsNotEmpty()
    type: CardType

    @IsString()
    @IsNotEmpty()
    nameOnCard: string
}