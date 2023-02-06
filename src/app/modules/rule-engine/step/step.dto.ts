import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { BaseEntityDTO } from '../../../database/entity.class';
import { StepStatus, StepType } from '../../../enums/step.enum';
import { Step } from '../../../interfaces/step.interface';
import { RecipeDTO } from '../recipe/recipe.dto';
import { UserDTO } from '../../core/user/user.dto';


export class CreateStepDTO {
  title!: string;
  desc?: string;
  order!: number;
  type?: StepType;
  delay?: Date;
  timer?: Date;
  loop?: boolean;
  disabled?: boolean;

  @Transform(({ value }) => ({ id: value }))
  recipe!: RecipeDTO;
}


export class UpdateStepDTO extends PartialType(CreateStepDTO) {

}


export class StepDTO extends BaseEntityDTO implements Step {
  title!: string;
  desc?: string;
  order!: number;
  status!: StepStatus;
  delay?: Date;
  timer?: Date;
  loop?: boolean;
  type!: StepType;
  disabled?: boolean;

  @Transform(({ value }) => value.id)
  recipe!: RecipeDTO;

  @Transform(({ value }) => value.id)
  owner!: UserDTO;

}