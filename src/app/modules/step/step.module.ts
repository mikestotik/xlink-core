import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepEntity } from './entities/step.entity';
import { StepController } from './step.controller';
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
