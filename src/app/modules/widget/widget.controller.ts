import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TokenPayload } from '../../decor/token.decorator';
import { JwtPayload } from '../../interfaces/auth.interface';
import { AccessTokenGuard } from '../auth/auth.guard';
import { CreateWidgetDTO, UpdateWidgetDTO, WidgetDTO } from './dto/widget.dto';
import { WidgetService } from './widget.service';


@UseGuards(AccessTokenGuard)
@Controller('widget')
export class WidgetController {

  constructor(
    private readonly widgetService: WidgetService) {
  }


  @Post()
  public create(@Body() dto: CreateWidgetDTO, @TokenPayload() payload: JwtPayload): Promise<WidgetDTO> {
    return this.widgetService.create(dto, payload.sub)
      .then(value => plainToInstance(WidgetDTO, value));
  }


  @Get()
  public findAll(@TokenPayload() payload: JwtPayload): Promise<WidgetDTO[]> {
    return this.widgetService.findAll(payload.sub)
      .then(value => plainToInstance(WidgetDTO, value));
  }


  @Get(':id')
  public findOne(@Param('id') id: number): Promise<WidgetDTO> {
    return this.widgetService.findOne(id)
      .then(value => plainToInstance(WidgetDTO, value));
  }


  @Patch(':id')
  public update(@Param('id') id: number, @Body() dto: UpdateWidgetDTO): Promise<WidgetDTO> {
    return this.widgetService.update(id, dto)
      .then(value => plainToInstance(WidgetDTO, value));
  }


  @Delete(':id')
  public remove(@Param('id') id: number): Promise<void> {
    return this.widgetService.remove(id);
  }
}
