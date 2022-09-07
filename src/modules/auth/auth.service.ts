import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dtos';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './repositories/auth.repository';
@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    return this.authRepository.register(registerDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.authRepository.login(loginDto);

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
