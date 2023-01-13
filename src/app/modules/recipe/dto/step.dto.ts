import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { BaseEntityDTO } from '../../../database/entity.class';
import { StepStatus, StepType } from '../../../enums/step.enum';
import { Step } from '../../../interfaces/recipe.interface';
import { RecipeDTO } from './recipe.dto';
import { UserDTO } from '../../user/user.dto';


export class CreateStepDTO {
  title!: string;
  desc?: string;
  order!: number;
  timer?: Date;

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
  timer?: Date;
  type!: StepType;

  @Transform(({ value }) => value.id)
  recipe!: RecipeDTO;

  @Transform(({ value }) => value.id)
  owner!: UserDTO;

}