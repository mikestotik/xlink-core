import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


export abstract class BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated!: Date;
}


export class BaseEntityDTO {
  id!: number;
  created!: Date;
  updated!: Date;
}