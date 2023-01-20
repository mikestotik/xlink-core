import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TokenPayload } from '../../../../decor/token.decorator';
import { JwtPayload } from '../../../../interfaces/auth.interface';
import { AccessTokenGuard } from '../../../core/auth/auth.guard';
import { CreateRecipeDTO, RecipeDTO, UpdateRecipeDTO } from '../dto/recipe.dto';
import { RecipeService } from '../services/recipe.service';


@UseGuards(AccessTokenGuard)
@Controller('recipe')
export class RecipeController {

  constructor(
    private readonly ruleService: RecipeService) {
  }


  @Post()
  public create(@Body() dto: CreateRecipeDTO, @TokenPayload() payload: JwtPayload): Promise<RecipeDTO> {
    return this.ruleService.create(dto, payload.sub)
      .then(value => plainToInstance(RecipeDTO, value));
  }


  @Get()
  public findAll(@TokenPayload() payload: JwtPayload): Promise<RecipeDTO[]> {
    return this.ruleService.findAll(payload.sub)
      .then(value => plainToInstance(RecipeDTO, value));
  }


  @Get(':id')
  public findOne(@Param('id') id: number): Promise<RecipeDTO> {
    return this.ruleService.findOne(id)
      .then(value => plainToInstance(RecipeDTO, value));
  }


  @Patch(':id')
  public update(@Param('id') id: number, @Body() dto: UpdateRecipeDTO): Promise<RecipeDTO> {
    return this.ruleService.update(id, dto)
      .then(value => plainToInstance(RecipeDTO, value));
  }


  @Delete(':id')
  public remove(@Param('id') id: number): Promise<void> {
    return this.ruleService.remove(id);
  }
}
