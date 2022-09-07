import { UsersModule } from './../users/users.module';
import { PrismaAuthRepository } from './repositories/prisma-auth.repository';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './repositories/auth.repository';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  providers: [
    JwtStrategy,
    AuthService,
    {
      provide: AuthRepository,
      useClass: PrismaAuthRepository,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
