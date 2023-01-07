import { PartialType } from '@nestjs/mapped-types';


export class CreateActionDTO {

}


export class UpdateActionDTO extends PartialType(CreateActionDTO) {

}


export class ActionDTO {

}