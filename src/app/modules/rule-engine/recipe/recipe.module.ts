import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeController } from './recipe.controller';
import { RecipeEntity } from './recipe.entity';
import { RecipeService } from './recipe.service';


const OrmModule = TypeOrmModule.forFeature([ RecipeEntity ]);


@Module({
  imports: [
    OrmModule
  ],
  controllers: [ RecipeController ],
  providers: [ RecipeService ]
})
export class RecipeModule {}
