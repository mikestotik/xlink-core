import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TokenPayload } from '../../../decor/token.decorator';
import { JwtPayload } from '../../../interfaces/auth.interface';
import { AccessTokenGuard } from '../../core/auth/auth.guard';
import { CreateTriggerDTO, TriggerDTO, UpdateTriggerDTO } from './trigger.dto';
import { TriggerService } from './trigger.service';


@UseGuards(AccessTokenGuard)
@Controller('trigger')
export class TriggerController {

  constructor(
    private readonly triggerService: TriggerService) {
  }


  @Post()
  public create(@Body() dto: CreateTriggerDTO, @TokenPayload() payload: JwtPayload): Promise<TriggerDTO> {
    return this.triggerService.create(dto, payload.sub)
      .then(value => plainToInstance(TriggerDTO, value));
  }


  @Get()
  public findAll(@TokenPayload() payload: JwtPayload): Promise<TriggerDTO[]> {
    return this.triggerService.findAll(payload.sub)
      .then(value => plainToInstance(TriggerDTO, value));
  }


  @Get(':id')
  public findOne(@Param('id') id: number): Promise<TriggerDTO> {
    return this.triggerService.findOne(id)
      .then(value => plainToInstance(TriggerDTO, value));
  }


  @Patch(':id')
  public update(@Param('id') id: number, @Body() dto: UpdateTriggerDTO): Promise<TriggerDTO> {
    return this.triggerService.update(id, dto)
      .then(value => plainToInstance(TriggerDTO, value));
  }


  @Delete(':id')
  public remove(@Param('id') id: number): Promise<void> {
    return this.triggerService.remove(id);
  }
}
