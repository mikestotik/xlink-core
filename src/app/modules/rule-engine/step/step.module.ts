import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepController } from './controllers/step.controller';
import { StepEntity } from './entities/step.entity';
import { StepService } from './services/step.service';


const OrmModule = TypeOrmModule.forFeature([ StepEntity ]);


@Module({
  imports: [
    OrmModule
  ],
  controllers: [ StepController ],
  providers: [ StepService ]
})
export class StepModule {}
