import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeController } from './controllers/recipe.controller';
import { RecipeEntity } from './entities/recipe.entity';
import { RecipeService } from './services/recipe.service';


const OrmModule = TypeOrmModule.forFeature([ RecipeEntity ]);


@Module({
  imports: [
    OrmModule
  ],
  controllers: [ RecipeController ],
  providers: [ RecipeService ]
})
export class RecipeModule {}
