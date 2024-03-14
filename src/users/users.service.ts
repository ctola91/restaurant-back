import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ username });
  }

  async createUser(
    username: string,
    password: string,
    firstname: string,
    lastname: string,
  ) {
    // const salt = bcrypt.genSaltSync(10);

    try {
      return this.usersRepository.save({
        username,
        password: bcrypt.hashSync(password, 10),
        firstname,
        lastname,
      });
    } catch (e) {
      console.log(e);
      throw BadRequestException;
    }
  }
}
