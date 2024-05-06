import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
