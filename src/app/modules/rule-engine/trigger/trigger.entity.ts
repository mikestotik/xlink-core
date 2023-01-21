import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entity.class';
import { Trigger } from '../../../interfaces/trigger.interface';
import { UserEntity } from '../../core/user/user.entity';
import { RuleEntity } from '../rule/rule.entity';


@Entity('triggers')
export class TriggerEntity extends BaseEntity implements Trigger {

  @Column()
  title!: string;

  @Column({ nullable: true })
  desc?: string;

  @Column({ type: 'timestamptz', nullable: true })
  recoveryTime?: Date;

  @ManyToOne(() => TriggerEntity, { eager: true })
  recoveryTrigger?: TriggerEntity;

  @Column({ nullable: true })
  triggered?: boolean;

  @ManyToOne(() => RuleEntity, { eager: true })
  rule!: RuleEntity;

  @ManyToOne(() => UserEntity, { eager: true })
  owner!: UserEntity;
}
