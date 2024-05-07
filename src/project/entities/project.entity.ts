import { iProject } from "../../interfaces/project.interface"
import { BaseEntity } from "../../config/base.entity"
import { Column, Entity, OneToMany } from "typeorm"
import { UsersProjectsEntity } from "../../user/entities/usersProjects.entity"

@Entity({ name: "projects" })
export class ProjectEntity extends BaseEntity implements iProject {
    @Column()
    name: string

    @Column()
    description: string

    @OneToMany(() => UsersProjectsEntity, userProject => userProject.project, {
        onDelete: "CASCADE",
    })
    usersIncludes: UsersProjectsEntity[]
}
