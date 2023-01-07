import { AssetPermission, DataType } from '../enums/asset.enum';
import { Device } from './device.interface';


export interface AssetMeta<T = number> {
  default: T;
  min: T;
  max: T;
  unit: string;
}


export interface Asset {
  title: string;
  desc?: string;
  icon?: string;
  permission: AssetPermission;
  type: DataType;
  meta: AssetMeta;
  link: string;
  device: Device;
}
