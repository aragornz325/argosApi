import { ROLES } from "../../constant/roles"
import { iUser } from "../../interfaces/user.interface"
import { Column, Entity, OneToMany, OneToOne } from "typeorm"
import { BaseEntity } from "../../config/base.entity"
import { UsersProjectsEntity } from "./usersProjects.entity"
import { TrafficTicketENTITY } from "../../ticket/entities/trafficTicket.entity"

@Entity({ name: "users" })
export class UsersEntity extends BaseEntity implements iUser {
    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ type: "enum", enum: ROLES })
    role: ROLES

    @Column({ unique: true })
    username: string

    @Column({ nullable: true })
    phone: string

    @OneToMany(() => UsersProjectsEntity, userProject => userProject.user, {
        onDelete: "CASCADE",
    })
    projectsIncludes: UsersProjectsEntity[]

    @OneToMany(() => TrafficTicketENTITY, ticket => ticket.user, {
        cascade: true, 
    })
    trafficTickets: TrafficTicketENTITY[];

}
