import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entity.class';
import { Device } from '../../../interfaces/device.interface';
import { UserEntity } from '../../user/user.entity';


@Entity('devices')
export class DeviceEntity extends BaseEntity implements Device {

  @Column()
  public deviceId!: string;

  @Column()
  public title!: string;

  @Column({ nullable: true })
  public desc?: string;

  @ManyToOne(() => UserEntity, { eager: true })
  public owner?: UserEntity;
}
