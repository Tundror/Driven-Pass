import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("users")
@Controller('users')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post("sign-up")
    @ApiOperation({summary: "User sign-up"})
    @ApiResponse({status: HttpStatus.CREATED, description: "Successfully created user"})
    signUp(@Body() signUpDto: SignUpDto){
        return this.authService.signUp(signUpDto)
    }

    @Post("sign-in")
    @ApiOperation({summary: "User sign-in"})
    @ApiResponse({status: HttpStatus.CREATED, description: "Successfully signed-in"})
    signIn(@Body() signUpDto: SignInDto){
        return this.authService.signIn(signUpDto)
    }
}
