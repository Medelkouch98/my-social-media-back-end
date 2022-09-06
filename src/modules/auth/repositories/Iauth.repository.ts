import { RegisterDto } from './../dtos/register.dto';
import { User } from '@prisma/client';
import { LoginDto } from '../dtos';

export interface IAuthRepository {
  register(registerDto: RegisterDto): Promise<User>;
  login(loginDto: LoginDto): Promise<User>;
}
