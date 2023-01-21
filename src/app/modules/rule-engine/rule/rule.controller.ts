import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TokenPayload } from '../../../decor/token.decorator';
import { JwtPayload } from '../../../interfaces/auth.interface';
import { AccessTokenGuard } from '../../core/auth/auth.guard';
import { CreateRuleDTO, RuleDTO, UpdateRuleDTO } from './rule.dto';
import { RuleService } from './rule.service';


@UseGuards(AccessTokenGuard)
@Controller('rule')
export class RuleController {

  constructor(
    private readonly ruleService: RuleService) {
  }


  @Post()
  public create(@Body() dto: CreateRuleDTO, @TokenPayload() payload: JwtPayload): Promise<RuleDTO> {
    return this.ruleService.create(dto, payload.sub)
      .then(value => plainToInstance(RuleDTO, value));
  }


  @Get()
  public findAll(@TokenPayload() payload: JwtPayload): Promise<RuleDTO[]> {
    return this.ruleService.findAll(payload.sub)
      .then(value => plainToInstance(RuleDTO, value));
  }


  @Get(':id')
  public findOne(@Param('id') id: number): Promise<RuleDTO> {
    return this.ruleService.findOne(id)
      .then(value => plainToInstance(RuleDTO, value));
  }


  @Patch(':id')
  public update(@Param('id') id: number, @Body() dto: UpdateRuleDTO): Promise<RuleDTO> {
    return this.ruleService.update(id, dto)
      .then(value => plainToInstance(RuleDTO, value));
  }


  @Delete(':id')
  public remove(@Param('id') id: number): Promise<void> {
    return this.ruleService.remove(id);
  }
}
