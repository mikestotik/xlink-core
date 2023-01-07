import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as moment from 'moment';
import { EmailService } from '../../services/email.service';
import { generateCode } from '../../utils/common.utils';
import { ConfirmService } from '../confirm/confirm.service';
import { CreateUserDTO, UpdateUserDTO } from '../user/user.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';


@Injectable()
export class AccountService {

  private readonly appName = process.env.APP_NAME || '';
  private readonly from = process.env.MAIL_USERNAME || '';


  constructor(
    private userService: UserService,
    private emailService: EmailService,
    private confirmService: ConfirmService) {
  }


  public async create(dto: CreateUserDTO): Promise<void> {
    const { id } = await this.userService.create(dto);

    const confirm = await this.confirmService.create(id, {
      code: generateCode(),
      exp: moment().add(Number(process.env.ACCOUNT_ACTIVATION_CONFIRM_TTL) || 3600, 'second').toDate(),
    });

    try {
      await this.sendActivationEmail(dto.email, confirm.code);
    } catch (e) {
      await this.userService.remove(id);
      throw new InternalServerErrorException('Sorry, you cannot register at the moment because the mail server is unavailable.');
    }
  }


  public async activate(code: number, email: string): Promise<void> {
    if (!code || isNaN(code)) {
      throw new BadRequestException('Wrong activation code');
    }

    const confirm = await this.confirmService.findByCode(code);

    if (!confirm) {
      throw new NotFoundException('No such activation code exists');
    }

    if (moment().isAfter(confirm.exp)) {
      throw new BadRequestException('Activation code expired');
    }

    await this.userService.activate(email);
  }


  public current(userId: number): Promise<UserEntity> {
    return this.userService.findOne(userId);
  }


  public update(id: number, dto: UpdateUserDTO): Promise<UserEntity> {
    return this.userService.update(id, dto);
  }


  private sendActivationEmail(email: string, code: number): Promise<unknown> {
    return this.emailService.send({
      subject: 'Account Activation ✔',
      from: `${ this.appName } <${ this.from }>`,
      to: email,
      text: `Your ${ this.appName } account has been created, please insert this code to the activation form: ${ code }`,
    });
  }
}
