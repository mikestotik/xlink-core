import * as moment from 'moment';
import { generateCode } from '../../../utils/common.utils';
import { CreateConfirmDTO } from './confirm.dto';


export class AccountActivationConfirm implements CreateConfirmDTO {

  public readonly code!: number;
  public readonly exp!: Date;


  constructor() {
    this.code = generateCode();
    this.exp = moment().add(process.env.ACCOUNT_ACTIVATION_CONFIRM_EXP || 3600, 'second').toDate();
  }
}
