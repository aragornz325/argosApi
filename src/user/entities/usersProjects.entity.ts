import { ACCESS_LEVEL } from "../../constant/roles";
import { BaseEntity } from "../../config/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { UsersEntity } from "./user.entity";
import { ProjectEntity } from "../../project/entities/project.entity";

@Entity({name: 'users_projects'})
export class UsersProjectsEntity extends BaseEntity {
    
    @Column({type: 'enum', enum: ACCESS_LEVEL})
    accessLevel: ACCESS_LEVEL;

    @ManyToOne(()=> UsersEntity, (user)=> user.projectsIncludes, {onDelete: 'CASCADE'} )
    user: UsersEntity;

    @ManyToOne(()=> ProjectEntity, (project)=> project.usersIncludes, {onDelete: 'CASCADE'} )
    project: ProjectEntity;
}