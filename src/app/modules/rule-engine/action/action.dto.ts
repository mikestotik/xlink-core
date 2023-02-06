import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { BaseEntityDTO } from '../../../database/entity.class';
import { ActionType } from '../../../enums/action.enum';
import { Action } from '../../../interfaces/action.interface';
import { UserDTO } from '../../core/user/user.dto';
import { RuleDTO } from '../rule/rule.dto';


export class CreateActionDTO {
  title!: string;
  desc?: string;
  type!: ActionType;
  payload!: string;
  disabled?: boolean;

  @Transform(({ value }) => ({ id: value }))
  rule!: RuleDTO;
}


export class UpdateActionDTO extends PartialType(CreateActionDTO) {

}


export class ActionDTO extends BaseEntityDTO implements Action {
  title!: string;
  desc?: string;
  type!: ActionType;
  payload!: string;
  disabled!: boolean;

  @Transform(({ value }) => value.id)
  rule!: RuleDTO;

  @Transform(({ value }) => value.id)
  owner!: UserDTO;
}
