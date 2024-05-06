import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from './config/data.source';


import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,

    }),
    TypeOrmModule.forRoot({
      ...DataSourceConfig
    }),
    TaskModule,
    UserModule,
    ProjectModule,
    
  ],
  controllers: [],
  providers: [],
    
})
export class AppModule {}
