import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { BaseEntityDTO } from '../../../database/entity.class';
import { Device } from '../../../interfaces/device.interface';
import { UserDTO } from '../../core/user/user.dto';


export class CreateDeviceDTO implements Device {
  uuid!: string;
  title!: string;
  desc?: string;
  icon?: string;
}


export class UpdateDeviceDTO extends PartialType(CreateDeviceDTO) {

}


export class DeviceDTO extends BaseEntityDTO implements Device {
  uuid!: string;
  title!: string;
  desc!: string;
  icon?: string;

  @Transform(({ value }) => value.id)
  owner!: UserDTO;
}
