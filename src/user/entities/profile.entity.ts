import { ROLES } from "../../constant/roles"
import { iUser } from "../interfaces/user.interface"
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { BaseEntity } from "../../config/base.entity"
import { iProfile } from "../interfaces/profile.interface"
import { UsersEntity } from "./user.entity"

@Entity({ name: "profiles" })
export class ProfileEntity extends BaseEntity implements iProfile {
    @Column({default: 'sin definir'})
    firstName: string

    @Column({default: 'sin definir'})
    lastName: string

    @Column({default: 99})
    age: number

    @Column({ nullable: true, default: '+5434345123456'})
    phone: string

    @Column({ nullable: true, default: 'sin definir'})
    address: string
    
    @Column({ nullable: true, default: 'sin definir'})
    city: string
    
    @Column({ nullable: true, default: 'sin definir'})
    country: string
    
    @Column({ nullable: true, default: 'sin definir'})
    postalCode: string
    
    @Column({ default: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png' })
    avatarUrl: string
    
    @Column({ nullable: true, default: 'sin definir'})
    bio: string
    
    @Column({ nullable: true, default: new Date(1971, 0, 1).toDateString()})
    dateOfBirth: Date
    
    @Column({ nullable: true, default: 'sin definir'})
    education: string
    
    @Column({ nullable: true, default: 'sin definir'})
    employment: string
    
    @Column({ nullable: true, default: 'sin definir'})
    gender: string
    
    @Column({ nullable: true, default: 'sin definir'})
    interests: string
    
    @Column({ nullable: true, default: 'sin definir'})
    socialMediaLinks: string

    @OneToOne(() => UsersEntity, user => user.profile)
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity; 

}
