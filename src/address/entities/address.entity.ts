import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'address'})
export class AddressEntity{
    @PrimaryGeneratedColumn('rowid')
    id:number;

    @Column({name: 'user_id', nullable: false})
    userId: number;

    @Column({name: 'complement', nullable: true})
    complemente: string;

    @Column({name: 'numbre', nullable: false})
    nuberAddress: number;

    @Column({name: 'cep', nullable: false})
    cep: string;

    @Column({name: 'city_id', nullable: false})
    cityId: number;

    @CreateDateColumn({name: 'created_at'})
    created_at: Date;
    
    @UpdateDateColumn({name: 'updated_at'})
    updated_at: Date; 
}