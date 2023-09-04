import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("app")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({summary: "Returns Hello World!"})
  @ApiResponse({status: HttpStatus.OK, description: "Returns Hello World!"})
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  @ApiOperation({summary: "Checks APIs health"})
  @ApiResponse({status: HttpStatus.OK, description: "Everything is okay!"})
  getHealth(): string {
    return this.appService.getHealth();
  }
}
