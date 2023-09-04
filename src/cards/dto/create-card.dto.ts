import { ApiProperty } from "@nestjs/swagger";
import { CardType } from "@prisma/client";
import { IsBoolean, IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, isDate } from "class-validator";

export class CreateCardDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "my card",
        description: "card identifier"
    })
    name: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 123456789,
        description: "card number"
    })
    number: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 234,
        description: "card cvv"
    })
    cvv: number

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({
        example: "2023-12-31T00:00:00.000Z",
        description: "card expiration date"
    })
    expiration: Date

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({
        example: true,
        description: "card is virtual or not"
    })
    virtual: boolean

    @IsEnum(CardType)
    @IsNotEmpty()
    @ApiProperty({
        example: "CREDIT",
        description: "card type (CREDIT/DEBIT/BOTH)"
    })
    type: CardType

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "KRATOS S SILVA",
        description: "name printed on card"
    })
    nameOnCard: string
}