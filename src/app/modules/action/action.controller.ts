import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TokenPayload } from '../../decor/token.decorator';
import { JwtPayload } from '../../interfaces/auth.interface';
import { AccessTokenGuard } from '../auth/auth.guard';
import { ActionService } from './action.service';
import { ActionDTO, CreateActionDTO, UpdateActionDTO } from './dto/action.dto';


@UseGuards(AccessTokenGuard)
@Controller('action')
export class ActionController {

  constructor(
    private readonly actionService: ActionService) {
  }


  @Post()
  public create(@Body() dto: CreateActionDTO, @TokenPayload() payload: JwtPayload): Promise<ActionDTO> {
    return this.actionService.create(dto, payload.sub)
      .then(value => plainToInstance(ActionDTO, value));
  }


  @Get()
  public findAll(@TokenPayload() payload: JwtPayload): Promise<ActionDTO[]> {
    return this.actionService.findAll(payload.sub)
      .then(value => plainToInstance(ActionDTO, value));
  }


  @Get(':id')
  public findOne(@Param('id') id: number): Promise<ActionDTO> {
    return this.actionService.findOne(id)
      .then(value => plainToInstance(ActionDTO, value));
  }


  @Patch(':id')
  public update(@Param('id') id: number, @Body() dto: UpdateActionDTO): Promise<ActionDTO> {
    return this.actionService.update(id, dto)
      .then(value => plainToInstance(ActionDTO, value));
  }


  @Delete(':id')
  public remove(@Param('id') id: number): Promise<void> {
    return this.actionService.remove(id);
  }
}
