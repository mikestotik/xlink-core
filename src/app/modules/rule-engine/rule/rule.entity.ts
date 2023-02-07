import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entity.class';
import { Rule } from '../../../interfaces/rule.interface';
import { UserEntity } from '../../core/user/user.entity';
import { StepEntity } from '../step/step.entity';


@Entity('rules')
export class RuleEntity extends BaseEntity implements Rule {

  @Column()
  title!: string;

  @Column({ nullable: true })
  desc?: string;

  @Column({ nullable: true, default: true })
  disabled?: boolean;

  @ManyToOne(() => StepEntity, { eager: true })
  step!: StepEntity;

  @ManyToOne(() => UserEntity)
  owner!: UserEntity;
}
