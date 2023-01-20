import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { ActionEntity } from './entities/action.entity';


const OrmModule = TypeOrmModule.forFeature([ ActionEntity ]);


@Module({
  imports: [
    OrmModule
  ],
  controllers: [ ActionController ],
  providers: [ ActionService ]
})
export class ActionModule {}
