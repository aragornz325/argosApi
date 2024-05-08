import { iProject } from "../interfaces/project.interface"
import { BaseEntity } from "../../config/base.entity"
import { Column, Entity, OneToMany } from "typeorm"


@Entity({ name: "projects" })
export class ProjectEntity extends BaseEntity implements iProject {
    @Column()
    name: string

    @Column()
    description: string
    
}
