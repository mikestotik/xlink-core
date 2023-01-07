import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TokenPayload } from '../../../decor/token.decorator';
import { JwtPayload } from '../../../interfaces/auth.interface';
import { AccessTokenGuard } from '../../auth/auth.guard';
import { DeviceService } from '../device.service';
import { CreateDeviceDTO, DeviceDTO, UpdateDeviceDTO } from '../dto/device.dto';


@UseGuards(AccessTokenGuard)
@Controller('device')
export class DeviceController {

  constructor(
    private readonly deviceService: DeviceService) {
  }


  @Post()
  public create(@Body() dto: CreateDeviceDTO, @TokenPayload() payload: JwtPayload): Promise<DeviceDTO> {
    return this.deviceService.create(dto, payload.sub)
      .then(value => plainToInstance(DeviceDTO, value));
  }


  @Get()
  public findAll(@TokenPayload() payload: JwtPayload): Promise<DeviceDTO[]> {
    return this.deviceService.findAllByOwner(payload.sub)
      .then(value => plainToInstance(DeviceDTO, value));
  }


  @Get(':id')
  public findOne(@Param('id') id: number): Promise<DeviceDTO> {
    return this.deviceService.findOne(id)
      .then(value => plainToInstance(DeviceDTO, value));
  }


  @Patch(':id')
  public update(@Param('id') id: number, @Body() dto: UpdateDeviceDTO): Promise<DeviceDTO> {
    return this.deviceService.update(id, dto)
      .then(value => plainToInstance(DeviceDTO, value));
  }


  @Delete(':id')
  public remove(@Param('id') id: number): Promise<void> {
    return this.deviceService.remove(id);
  }

}
