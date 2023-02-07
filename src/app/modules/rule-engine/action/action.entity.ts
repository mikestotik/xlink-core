import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entity.class';
import { ActionType } from '../../../enums/action.enum';
import { Action } from '../../../interfaces/action.interface';
import { UserEntity } from '../../core/user/user.entity';
import { RuleEntity } from '../rule/rule.entity';


@Entity('actions')
export class ActionEntity extends BaseEntity implements Action {

  @Column()
  title!: string;

  @Column({ nullable: true })
  desc?: string;

  @Column({ type: 'enum', enum: ActionType })
  type!: ActionType;

  @Column({ nullable: true })
  disabled?: boolean;

  @Column({ type: 'json' })
  payload!: string;

  @ManyToOne(() => RuleEntity, { eager: true, onDelete: 'CASCADE' })
  rule!: RuleEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  owner!: UserEntity;
}
