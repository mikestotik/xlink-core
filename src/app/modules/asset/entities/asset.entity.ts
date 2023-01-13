import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entity.class';
import { AssetPermission, DataType } from '../../../enums/asset.enum';
import { Asset, AssetMeta } from '../../../interfaces/asset.interface';
import { DeviceEntity } from '../../device/entities/device.entity';
import { UserEntity } from '../../user/user.entity';


@Entity('assets')
export class AssetEntity extends BaseEntity implements Asset {

  @Column()
  title!: string;

  @Column({ nullable: true })
  desc?: string;

  @Column({ nullable: true })
  icon?: string;

  @Column()
  link!: string;

  @Column({ type: 'json' })
  meta!: AssetMeta;

  @Column({ type: 'enum', enum: AssetPermission, default: AssetPermission.Read })
  permission!: AssetPermission;

  @Column({ type: 'enum', enum: DataType, default: DataType.Integer })
  type!: DataType;

  @ManyToOne(() => DeviceEntity, { eager: true, onDelete: 'CASCADE' })
  device!: DeviceEntity;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE' })
  owner!: UserEntity;

}
