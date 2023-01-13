import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entity.class';
import { StepStatus, StepType } from '../../../enums/step.enum';
import { Step } from '../../../interfaces/recipe.interface';
import { RecipeEntity } from '../../recipe/entities/recipe.entity';
import { UserEntity } from '../../user/user.entity';


@Entity('steps')
export class StepEntity extends BaseEntity implements Step {

  @Column()
  public title!: string;

  @Column({ nullable: true })
  public desc?: string;

  @Column()
  public order!: number;

  @Column({ type: 'enum', enum: StepStatus, default: StepStatus.Disabled })
  public status!: StepStatus;

  @Column({ type: 'timestamptz' })
  public timer?: Date;

  @Column({ type: 'enum', enum: StepType, default: StepType.Regular })
  public type!: StepType;

  @ManyToOne(() => UserEntity, { eager: true })
  owner!: UserEntity;

  @ManyToOne(() => RecipeEntity, { eager: true })
  recipe!: RecipeEntity;

}
