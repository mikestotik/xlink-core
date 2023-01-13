import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entity.class';
import { ActionType } from '../../../enums/rule.enum';
import {
  AssetRuleActionPayload,
  NotificationRuleActionPayload,
  RuleAction,
  StepRuleActionPayload
} from '../../../interfaces/recipe.interface';
import { UserEntity } from '../../user/user.entity';


@Entity('actions')
export class ActionEntity extends BaseEntity implements RuleAction {

  @Column({ type: 'enum', enum: ActionType })
  type!: ActionType;

  @Column({ type: 'json' })
  payload!: NotificationRuleActionPayload | StepRuleActionPayload | AssetRuleActionPayload;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE' })
  owner!: UserEntity;
}
