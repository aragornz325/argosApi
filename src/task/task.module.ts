import { Module } from "@nestjs/common"
import { TaskService } from "./services/task.service"
import { TaskController } from "./controller/task.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Task } from "./entities/task.entity"

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    providers: [TaskService],
    controllers: [TaskController],
})
export class TaskModule {}
