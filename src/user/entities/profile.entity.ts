import { ROLES } from "../../constant/roles"
import { iUser } from "../interfaces/user.interface"
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { BaseEntity } from "../../config/base.entity"
import { iProfile } from "../interfaces/profile.interface"
import { UsersEntity } from "./user.entity"

@Entity({ name: "profiles" })
export class ProfileEntity extends BaseEntity implements iProfile {
    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column({ nullable: true })
    phone: string

    @Column({ nullable: true })
    address: string
    
    @Column({ nullable: true })
    city: string
    
    @Column({ nullable: true })
    country: string
    
    @Column({ nullable: true })
    postalCode: string
    
    @Column({ nullable: true })
    avatarUrl: string
    
    @Column({ nullable: true })
    bio: string
    
    @Column({ nullable: true })
    dateOfBirth: Date
    
    @Column({ nullable: true })
    education: string
    
    @Column({ nullable: true })
    employment: string
    
    @Column({ nullable: true })
    gender: string
    
    @Column({ nullable: true })
    interests: string
    
    @Column({ nullable: true })
    socialMediaLinks: string

    @OneToOne(() => UsersEntity, user => user.profile)
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity; 

}
