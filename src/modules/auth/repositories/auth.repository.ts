import { RegisterDto } from '../dtos/register.dto';
import { User } from '@prisma/client';
import { LoginDto } from '../dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AuthRepository {
  abstract register(registerDto: RegisterDto): Promise<User>;
  abstract login(loginDto: LoginDto): Promise<User>;
}
