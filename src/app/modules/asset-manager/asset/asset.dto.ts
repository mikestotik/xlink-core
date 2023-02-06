import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { BaseEntityDTO } from '../../../database/entity.class';
import { AssetPermission, DataType } from '../../../enums/asset.enum';
import { Asset, AssetMeta } from '../../../interfaces/asset.interface';
import { DeviceEntity } from '../device/device.entity';
import { UserEntity } from '../../core/user/user.entity';


export class CreateAssetDTO implements Asset {
  title!: string;
  desc?: string;
  icon?: string;
  color?: string;
  link!: string;
  meta!: AssetMeta;
  permission!: AssetPermission;
  type!: DataType;

  @Transform(({ value }) => ({ id: value }))
  device!: DeviceEntity;
}


export class UpdateAssetDTO extends PartialType(CreateAssetDTO) {

}


export class AssetDTO extends BaseEntityDTO implements Asset {
  title!: string;
  desc?: string;
  icon?: string;
  color?: string;
  link!: string;
  meta!: AssetMeta;
  permission!: AssetPermission;
  type!: DataType;

  @Transform(({ value }) => value.id)
  device!: DeviceEntity;

  @Transform(({ value }) => value.id)
  owner!: UserEntity;
}