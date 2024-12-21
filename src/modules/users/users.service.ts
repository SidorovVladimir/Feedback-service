import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { TokenService } from '../token/token.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUserResponse } from '../auth/response/auth-user.response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      return hash;
      return;
    } catch (e) {
      throw new Error(e);
    }
  }

  async createUser(dto: CreateUserDto): Promise<void> {
    const user = {
      email: dto.email,
      password: await this.hashPassword(dto.password),
    };
    await this.usersRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.usersRepository.findOne({ where: { email } });
    } catch (e) {
      throw new Error(e);
    }
  }
  async publicUser(email: string): Promise<AuthUserResponse> {
    try {
      const user = await this.usersRepository.findOne({
        where: { email },
        select: {
          id: true,
          email: true,
        },
      });
      const token = await this.tokenService.generateJwtToken(user);
      return { user, token };
    } catch (e) {
      throw new Error(e);
    }
  }
}
