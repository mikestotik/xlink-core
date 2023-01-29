import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entity.class';
import { Trigger, TriggerCondition } from '../../../interfaces/trigger.interface';
import { AssetEntity } from '../../asset-manager/asset/asset.entity';
import { UserEntity } from '../../core/user/user.entity';
import { RuleEntity } from '../rule/rule.entity';


@Entity('triggers')
export class TriggerEntity extends BaseEntity implements Trigger {

  @Column()
  title!: string;

  @Column({ nullable: true })
  desc?: string;

  @Column({ nullable: true })
  chain?: string;

  @Column({ nullable: true })
  recoveryTime?: number;

  @Column({ nullable: true })
  recoveryTrigger?: number;

  @Column({ nullable: true })
  triggered?: boolean;

  @Column({ nullable: true })
  disabled?: boolean;

  @Column({ nullable: true })
  color?: string;

  @Column({ type: 'json', nullable: true })
  conditions?: TriggerCondition[];

  @ManyToOne(() => RuleEntity, { eager: true })
  rule!: RuleEntity;

  @JoinTable({
    name: 'triggers_assets',
    joinColumn: {
      name: 'trigger_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'asset_id',
      referencedColumnName: 'id'
    }
  })
  @ManyToMany(() => AssetEntity, {
    cascade: true,
    eager: true
  })
  assets?: AssetEntity[];

  @ManyToOne(() => UserEntity, { eager: true })
  owner!: UserEntity;


  public addAsset(asset: AssetEntity): void {
    if (this.assets) {
      this.assets.push(asset);
    }
  }


  public removeAsset(id: number): void {
    if (this.assets) {
      this.assets = this.assets.filter(i => i.id !== id);
    }
  }
}
