import { UsersModule } from './../users/users.module';
import { AuthRepository } from './repositories/auth.repository';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  providers: [JwtStrategy, AuthService, AuthRepository],
  controllers: [AuthController],
})
export class AuthModule {}
