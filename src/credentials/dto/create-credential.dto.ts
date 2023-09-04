import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateCredentialDto {
    @IsUrl()
    @IsNotEmpty()
    @ApiProperty({
        example: "https://twitter.com/home",
        description: "credential url"
    })
    url: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "kratos",
        description: "credential username"
    })
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "yourpassword",
        description: "credential password"
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "twitter credential",
        description: "credential identifier"
    })
    name: string;
}
