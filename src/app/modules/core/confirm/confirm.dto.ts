import { PartialType } from '@nestjs/mapped-types';
import { Confirm } from '../../../interfaces/confirm.interface';


export class CreateConfirmDTO implements Confirm {
  code!: number;
  exp!: Date;
}


export class UpdateConfirmDTO extends PartialType(CreateConfirmDTO) {}


export class ConfirmDTO implements Confirm {
  id!: number;
  code!: number;
  exp!: Date;
  created!: Date;
  updated!: Date;
}
