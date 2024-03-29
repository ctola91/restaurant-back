import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from './auth.guards';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: CreateAuthDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('register')
  signUp(@Body() signUpDto: RegisterAuthDto) {
    return this.authService.signUp(
      signUpDto.username,
      signUpDto.password,
      signUpDto.firstname,
      signUpDto.lastname,
    );
  }

  @UseGuards(AuthGuard)
  @Get('session')
  getSession(@Request() req) {
    return req.user;
  }
}
