import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetEntity } from '../../asset-manager/asset/asset.entity';
import { TriggerController } from './trigger.controller';
import { TriggerEntity } from './trigger.entity';
import { TriggerService } from './trigger.service';


const OrmModule = TypeOrmModule.forFeature([ TriggerEntity, AssetEntity ]);


@Module({
  imports: [
    OrmModule
  ],
  controllers: [
    TriggerController
  ],
  providers: [
    TriggerService
  ],
  exports: [
    OrmModule
  ]
})
export class TriggerModule {}
