import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { BaseEntityDTO, SchemaEntityDTO } from '../../../database/entity.class';
import { Trigger } from '../../../interfaces/trigger.interface';
import { UserDTO } from '../../core/user/user.dto';
import { RuleDTO } from '../rule/rule.dto';


export class CreateTriggerDTO {
  title!: string;
  desc?: string;

  recoveryTime?: Date;

  @Transform(({ value }) => ({ id: value }))
  recoveryTrigger?: SchemaEntityDTO;

  @Transform(({ value }) => ({ id: value }))
  rule!: SchemaEntityDTO;
}


export class UpdateTriggerDTO extends PartialType(CreateTriggerDTO) {
  triggered?: boolean;
}


export class TriggerDTO extends BaseEntityDTO implements Trigger {
  title!: string;
  desc?: string;

  triggered?: boolean;

  recoveryTime?: Date;

  @Transform(({ value }) => value.id)
  recoveryTrigger?: TriggerDTO;

  @Transform(({ value }) => value.id)
  rule!: RuleDTO;

  @Transform(({ value }) => value.id)
  owner!: UserDTO;
}