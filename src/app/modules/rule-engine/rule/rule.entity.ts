import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entity.class';
import { RuleType } from '../../../enums/rule.enum';
import { AssetRuleCondition, Rule, TimeRuleCondition } from '../../../interfaces/recipe.interface';
import { StepEntity } from '../step/step.entity';
import { UserEntity } from '../../core/user/user.entity';


@Entity('rules')
export class RuleEntity extends BaseEntity implements Rule {

  @Column()
  public title!: string;

  @Column({ nullable: true })
  public desc?: string;

  @Column({ type: 'enum', enum: RuleType })
  public type!: RuleType;

  @Column({ type: 'json' })
  public conditions!: TimeRuleCondition | AssetRuleCondition;

  @ManyToOne(() => UserEntity, { eager: true })
  owner!: UserEntity;

  @ManyToOne(() => StepEntity, { eager: true })
  step!: StepEntity;

  // TODO: - RuleAction, - Step
  // public actions: RuleAction[];
}
