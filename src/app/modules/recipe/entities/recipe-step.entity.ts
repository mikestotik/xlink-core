import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entity.class';
import { StepStatus, StepType } from '../../../enums/step.enum';
import { Step } from '../../../interfaces/recipe.interface';
import { UserEntity } from '../../user/user.entity';
import { RecipeEntity } from './recipe.entity';


@Entity('steps')
export class StepEntity extends BaseEntity implements Step {

  @Column()
  title!: string;

  @Column({ nullable: true })
  desc?: string;

  @Column()
  order!: number;

  @Column({ type: 'enum', enum: StepStatus, default: StepStatus.Stopped })
  status!: StepStatus;

  @Column({ type: 'timestamptz', nullable: true })
  startTimer?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  timer?: Date;

  @Column({ type: 'enum', enum: StepType, default: StepType.Regular })
  type!: StepType;

  @Column({ nullable: true })
  disabled?: boolean;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE' })
  owner!: UserEntity;

  @ManyToOne(() => RecipeEntity, { eager: true, onDelete: 'CASCADE' })
  recipe!: RecipeEntity;

}
