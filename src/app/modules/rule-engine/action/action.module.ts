import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionController } from './action.controller';
import { ActionEntity } from './action.entity';
import { ActionService } from './action.service';


const OrmModule = TypeOrmModule.forFeature([ ActionEntity ]);


@Module({
  imports: [
    OrmModule
  ],
  controllers: [ ActionController ],
  providers: [ ActionService ]
})
export class ActionModule {}
