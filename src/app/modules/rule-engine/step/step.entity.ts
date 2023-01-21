import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entity.class';
import { StepStatus, StepType } from '../../../enums/step.enum';
import { Step } from '../../../interfaces/recipe.interface';
import { UserEntity } from '../../core/user/user.entity';
import { RecipeEntity } from '../recipe/recipe.entity';


@Entity('steps')
export class StepEntity extends BaseEntity implements Step {

  @Column()
  title!: string;

  @Column({ nullable: true })
  desc?: string;

  @Column()
  order!: number;

  @Column({ type: 'timestamptz', nullable: true })
  delay!: Date;

  @Column({ type: 'timestamptz', nullable: true })
  timer?: Date;

  @Column({ nullable: true })
  loop?: boolean;

  @Column({ type: 'enum', enum: StepType, default: StepType.Regular })
  type!: StepType;

  @Column({ type: 'enum', enum: StepStatus, default: StepStatus.Stopped })
  status!: StepStatus;

  @Column({ nullable: true })
  disabled?: boolean;

  @ManyToOne(() => RecipeEntity, { eager: true, onDelete: 'CASCADE' })
  recipe!: RecipeEntity;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE' })
  owner!: UserEntity;
}
