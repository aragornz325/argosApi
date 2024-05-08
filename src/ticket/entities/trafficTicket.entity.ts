import { BaseEntity } from "../../config/base.entity";
import { iTrafficTicket } from "../../interfaces/trafficTicket.interface";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

import { TYPEOFSERVICE, VEHICLEBRAND } from "../../constant/ticket";
import { UsersEntity } from "../../user/entities/user.entity";

@Entity({ name: "traffic_tickets" })
export class TrafficTicketENTITY extends BaseEntity implements iTrafficTicket {
       
    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    date: Date;
    
    @Column({ type: 'time', default: () => 'CURRENT_TIMESTAMP' })
    time: string;
    
    @Column()
    location: string;
    
    @Column()
    plateNumber: string;
    
    @Column({type: "enum", enum: VEHICLEBRAND})
    vehicleBrand: VEHICLEBRAND;
    
    @Column({default: 0})
    modelYear: number;
    
    @Column()
    color: string;
    
    @Column({type: "enum", enum: TYPEOFSERVICE})
    typeOfService: TYPEOFSERVICE;
    
    @Column({nullable: true})
    infractionCode: string | null;
    
    @Column({nullable: true})
    lawArticleNumber: string | null;
    
    @Column({
        type: 'text', 
        default: "sin observaciones"
    })
    observations: string;
    
    @Column({
        type:'text', 
        default: "no se proporciono nombre del conductor"
    })
    driverName: string;
    
    @Column({
        type:'text', 
        default: "no se proporciono numero de licencia del conductor"
    })
    driverLicenseNumber: string;
    
    @Column({
        type:'text', 
        default: "no se proporciono direccion del conductor"
    })
    driverAddress: string;
    
    @Column({
        type:'text', 
        default: "no se proporciono telefono del conductor"
    })
    driverPhone: string;

    @Column({
        type:'text',
    })
    photoURL: string;  

    @Column({
        type:'text', 
        default: "no se proporciono email del conductor"})
    driverEmail: string;

    @ManyToOne(() => UsersEntity, user => user.trafficTickets)
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity;
}