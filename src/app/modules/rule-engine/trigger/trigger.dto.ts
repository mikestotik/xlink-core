import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { BaseEntityDTO, SchemaEntityDTO } from '../../../database/entity.class';
import { Trigger, TriggerCondition } from '../../../interfaces/trigger.interface';
import { AssetDTO } from '../../asset-manager/asset/asset.dto';
import { RuleDTO } from '../rule/rule.dto';


export class CreateTriggerDTO {
  title!: string;
  desc?: string;
  chain?: string;
  recoveryTime?: number;
  recoveryTrigger?: number;
  color?: string;
  disabled?: boolean;
  conditions?: TriggerCondition[];
  triggered?: boolean;

  @Transform(({ value }) => ({ id: value }))
  rule!: SchemaEntityDTO;
}


export class UpdateTriggerDTO extends PartialType(CreateTriggerDTO) {

}


export class TriggerDTO extends BaseEntityDTO implements Trigger {
  title!: string;
  desc?: string;
  chain?: string;
  triggered?: boolean;
  recoveryTime?: number;
  recoveryTrigger?: number;
  color?: string;
  disabled?: boolean;

  conditions?: TriggerCondition[];

  @Transform(({ value }) => value.id)
  rule!: RuleDTO;

  @Transform(({ value }) => value.map(entity => entity.id))
  assets!: AssetDTO[];
}