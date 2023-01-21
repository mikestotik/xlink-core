import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TriggerEntity } from './trigger.entity';
import { TriggerController } from './trigger.controller';
import { TriggerService } from './trigger.service';


const OrmModule = TypeOrmModule.forFeature([ TriggerEntity ]);


@Module({
  imports: [
    OrmModule
  ],
  controllers: [ TriggerController ],
  providers: [ TriggerService ]
})
export class TriggerModule {}
