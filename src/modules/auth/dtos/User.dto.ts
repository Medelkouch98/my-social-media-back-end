import { User } from '@prisma/client';

export class UserDto implements User {
  email: string;
  firstname: string;
  lastname: string;
  id: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
