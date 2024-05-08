import { ROLES } from "../../constant/roles"
import { iUser } from "../interfaces/user.interface"
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { BaseEntity } from "../../config/base.entity"
import { TrafficTicketENTITY } from "../../ticket/entities/trafficTicket.entity"
import { ProfileEntity } from "./profile.entity"


@Entity({ name: "users" })
export class UsersEntity extends BaseEntity implements iUser {
    @Column({ unique: true })
    username: string
    
    @Column()
    password: string

    @Column({ unique: true })
    email: string

    @Column({ type: "enum", enum: ROLES })
    role: ROLES

    @OneToMany(() => TrafficTicketENTITY, ticket => ticket.user, {
        cascade: true, 
    })
    trafficTickets: TrafficTicketENTITY[];

    @OneToOne(() => ProfileEntity, profile => profile.user)
    profile: ProfileEntity;

}
