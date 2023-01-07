import { PartialType } from '@nestjs/mapped-types';


export class CreateWidgetDTO {

}


export class UpdateWidgetDTO extends PartialType(CreateWidgetDTO) {

}


export class WidgetDTO {

}