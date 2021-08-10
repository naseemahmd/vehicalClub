import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehicle')
export class vehicleEntity {

    @PrimaryGeneratedColumn('uuid') id: string;

    @Column({nullable: true }) v_id: string;

    @Column('text') first_name: string;

    @Column('text') last_name: string;

    @Column('text') email: string;

    @Column('text') car_make: string;

    @Column('text') car_model: string;

    @Column('text') vin_number: string;

    @Column({ type: 'date',nullable: true }) manufactured_date: string;

    @Column({ type: 'text',nullable: true }) age_of_vehicle: string;

    @CreateDateColumn() created_at: Date;

    @CreateDateColumn() updated_at: Date;


}