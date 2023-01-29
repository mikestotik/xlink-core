import { PartialType } from '@nestjs/mapped-types';
import { plainToInstance, Transform } from 'class-transformer';
import { BaseEntityDTO, SchemaEntityDTO } from '../../../database/entity.class';
import { Trigger, TriggerCondition } from '../../../interfaces/trigger.interface';
import { AssetDTO } from '../../asset-manager/asset/asset.dto';
import { UserDTO } from '../../core/user/user.dto';
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

  @Transform(({ value }) => value.id)
  owner!: UserDTO;

  @Transform(({ value }) => value.map(assetEntity => plainToInstance(AssetDTO, assetEntity)))
  assets!: AssetDTO[];
}