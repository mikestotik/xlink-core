import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { BaseEntityDTO } from '../../../database/entity.class';
import { Rule } from '../../../interfaces/rule.interface';
import { UserDTO } from '../../core/user/user.dto';


export class CreateRuleDTO {
  title!: string;
  desc?: string;
}


export class UpdateRuleDTO extends PartialType(CreateRuleDTO) {

}


export class RuleDTO extends BaseEntityDTO implements Rule {
  title!: string;
  desc?: string;

  @Transform(({ value }) => value.id)
  step!: UserDTO;

  @Transform(({ value }) => value.id)
  owner!: UserDTO;
}