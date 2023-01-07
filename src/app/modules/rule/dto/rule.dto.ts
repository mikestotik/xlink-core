import { PartialType } from '@nestjs/mapped-types';


export class CreateRuleDTO {

}


export class UpdateRuleDTO extends PartialType(CreateRuleDTO) {

}


export class RuleDTO {

}