import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entity.class';
import { AssetPermission, DataType } from '../../../enums/asset.enum';
import { Asset, AssetMeta } from '../../../interfaces/asset.interface';
import { DeviceEntity } from '../../device/entities/device.entity';
import { UserEntity } from '../../user/user.entity';


@Entity('assets')
export class AssetEntity extends BaseEntity implements Asset {

  @Column()
  public title!: string;

  @Column({ nullable: true })
  public desc?: string;

  @Column({ nullable: true })
  public icon?: string;

  @Column()
  public link!: string;

  @Column({ type: 'json' })
  public meta!: AssetMeta;

  @Column({ type: 'enum', enum: AssetPermission, default: AssetPermission.Read })
  public permission!: AssetPermission;

  @Column({ type: 'enum', enum: DataType, default: DataType.Integer })
  public type!: DataType;

  @ManyToOne(() => DeviceEntity, { eager: true })
  public device!: DeviceEntity;

  @ManyToOne(() => UserEntity, { eager: true })
  public owner!: UserEntity;

}
