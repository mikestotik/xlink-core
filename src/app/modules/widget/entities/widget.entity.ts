import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entity.class';
import { WidgetSize, WidgetType } from '../../../enums/widget.enum';
import { Widget } from '../../../interfaces/widget.interface';
import { UserEntity } from '../../core/user/user.entity';


@Entity('widgets')
export class WidgetEntity extends BaseEntity implements Widget {

  @Column()
  public title!: string;

  @Column({ type: 'enum', enum: WidgetSize })
  public size!: WidgetSize;

  @Column({ type: 'enum', enum: WidgetType })
  public type!: WidgetType;

  @ManyToOne(() => UserEntity, { eager: true })
  owner!: UserEntity;

  // TODO: - Asset
}
