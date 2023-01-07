import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WidgetEntity } from './entities/widget.entity';
import { WidgetController } from './widget.controller';
import { WidgetService } from './widget.service';


const OrmModule = TypeOrmModule.forFeature([ WidgetEntity ]);


@Module({
  imports: [
    OrmModule
  ],
  controllers: [ WidgetController ],
  providers: [ WidgetService ]
})
export class WidgetModule {}
