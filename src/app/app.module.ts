import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../modules/auth/auth.module';
import { PrismaModule } from '../modules/prisma/prisma.module';
import { UsersModule } from './../modules/users/users.module';
import { FriendRequestModule } from './../modules/friend-request/friend-request.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UsersModule,
    FriendRequestModule,
  ],
})
export class AppModule {}
