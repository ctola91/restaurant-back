import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByUsername(username);
      const isValidPassword = bcrypt.compareSync(pass, user?.password);
      if (!isValidPassword) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user.id, username: user.username };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      console.log(e);
      throw BadRequestException;
    }
  }

  async signUp(
    username: string,
    password: string,
    firstname: string,
    lastname: string,
  ) {
    try {
      const user = await this.usersService.createUser(
        username,
        password,
        firstname,
        lastname,
      );

      delete user.password;

      return user;
    } catch (e) {
      console.log(e);
      throw BadRequestException;
    }
  }
}
