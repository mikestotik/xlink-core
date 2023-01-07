import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TokenPayload } from '../../decor/token.decorator';
import { JwtPayload } from '../../interfaces/auth.interface';
import { AccessTokenGuard } from '../auth/auth.guard';
import { CreateUserDTO, UpdateUserDTO } from '../user/user.dto';
import { AccountActivateDTO, AccountDTO } from './account.dto';
import { AccountService } from './account.service';


@Controller('account')
export class AccountController {

  constructor(
    private readonly accountService: AccountService) {
  }


  @Post()
  public create(@Body() dto: CreateUserDTO): Promise<void> {
    return this.accountService.create(dto);
  }


  @UseGuards(AccessTokenGuard)
  @Get('me')
  public current(@TokenPayload() payload: JwtPayload): Promise<AccountDTO> {
    return this.accountService.current(payload.sub)
      .then(entity => plainToInstance(AccountDTO, entity));
  }


  @UseGuards(AccessTokenGuard)
  @Patch()
  public async update(@Body() dto: UpdateUserDTO, @TokenPayload() payload: JwtPayload): Promise<AccountDTO> {
    return this.accountService.update(payload.sub, dto)
      .then(entity => plainToInstance(AccountDTO, entity));
  }


  @Post('activate')
  public async activate(@Body() dto: AccountActivateDTO): Promise<void> {
    return this.accountService.activate(dto.code, dto.email);
  }

}