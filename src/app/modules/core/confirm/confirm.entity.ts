import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entity.class';
import { UserEntity } from '../user/user.entity';


@Entity('confirmations')
export class ConfirmEntity extends BaseEntity {

  @Column()
  code!: number;

  @Column({ type: 'timestamptz' })
  exp!: Date;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE' })
  owner!: UserEntity;
}
