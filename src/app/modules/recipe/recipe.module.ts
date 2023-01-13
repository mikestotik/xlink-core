import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepController } from './controllers/step.controller';
import { RecipeEntity } from './entities/recipe.entity';
import { RecipeController } from './controllers/recipe.controller';
import { StepEntity } from './entities/step.entity';
import { RecipeService } from './services/recipe.service';
import { StepService } from './services/step.service';


const OrmModule = TypeOrmModule.forFeature([ RecipeEntity, StepEntity ]);


@Module({
  imports: [
    OrmModule
  ],
  controllers: [ RecipeController, StepController ],
  providers: [ RecipeService, StepService ]
})
export class RecipeModule {}
