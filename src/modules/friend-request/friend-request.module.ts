import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { FriendRequestRepository } from './friend-request.repository';

@Module({
  controllers: [FriendRequestController],
  providers: [FriendRequestService, FriendRequestRepository],
})
export class FriendRequestModule {}
