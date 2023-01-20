import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceController } from './controllers/device.controller';
import { DeviceService } from './device.service';
import { DeviceEntity } from './entities/device.entity';


const OrmModule = TypeOrmModule.forFeature([DeviceEntity]);


@Module({
  imports: [
    OrmModule,
  ],
  controllers: [
    DeviceController,
  ],
  providers: [
    DeviceService,
  ],
  exports: [
    DeviceService
  ]
})
export class DeviceModule { }
