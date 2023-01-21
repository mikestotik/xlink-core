import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepController } from './step.controller';
import { StepEntity } from './step.entity';
import { StepService } from './step.service';


const OrmModule = TypeOrmModule.forFeature([ StepEntity ]);


@Module({
  imports: [
    OrmModule
  ],
  controllers: [ StepController ],
  providers: [ StepService ]
})
export class StepModule {}
