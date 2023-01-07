import { PartialType } from '@nestjs/mapped-types';


export class CreateStepDTO {

}


export class UpdateStepDTO extends PartialType(CreateStepDTO) {

}


export class StepDTO {

}