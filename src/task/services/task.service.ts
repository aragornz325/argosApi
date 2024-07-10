import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Task } from "../entities/task.entity"

@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}

    findAll() {
        return this.taskRepo.find()
    }

    findOne(id: number) {
        return this.taskRepo.findOne({ where: { id } })
    }

    create(body: any) {
        const newTask = this.taskRepo.create(body)
        return this.taskRepo.save(newTask)
    }

    async update(id: number, body: any) {
        const task = await this.taskRepo.findOne({ where: { id } })
        this.taskRepo.merge(task, body)
    }

    async delete(id: number) {
        await this.taskRepo.delete(id)
        return true
    }
}
