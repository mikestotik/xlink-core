import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { BaseEntityDTO } from '../../../../database/entity.class';
import { StepStatus, StepType } from '../../../../enums/step.enum';
import { Step } from '../../../../interfaces/recipe.interface';
import { RecipeDTO } from '../../recipe/dto/recipe.dto';
import { UserDTO } from '../../../core/user/user.dto';


export class CreateStepDTO {
  order!: number;
  title!: string;
  desc?: string;
  type?: StepType;
  timer?: Date;

  @Transform(({ value }) => ({ id: value }))
  recipe!: RecipeDTO;
}


export class UpdateStepDTO extends PartialType(CreateStepDTO) {
  disabled?: boolean;
}


export class StepDTO extends BaseEntityDTO implements Step {
  title!: string;
  desc?: string;
  order!: number;
  status!: StepStatus;
  startTimer?: Date;
  timer?: Date;
  type!: StepType;
  disabled?: boolean;

  @Transform(({ value }) => value.id)
  recipe!: RecipeDTO;

  @Transform(({ value }) => value.id)
  owner!: UserDTO;

}