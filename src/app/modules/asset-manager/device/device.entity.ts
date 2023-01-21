import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entity.class';
import { Device } from '../../../interfaces/device.interface';
import { UserEntity } from '../../core/user/user.entity';


@Entity('devices')
export class DeviceEntity extends BaseEntity implements Device {

  @Column()
  public uuid!: string;

  @Column()
  public title!: string;

  @Column({ nullable: true })
  public desc?: string;

  @Column({ nullable: true })
  public icon?: string;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE' })
  public owner?: UserEntity;
}
