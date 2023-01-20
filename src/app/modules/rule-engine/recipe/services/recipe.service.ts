import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateRecipeDTO, UpdateRecipeDTO } from '../dto/recipe.dto';
import { RecipeEntity } from '../entities/recipe.entity';


@Injectable()
export class RecipeService {

  constructor(
    @InjectRepository(RecipeEntity)
    private readonly repository: Repository<RecipeEntity>) {
  }


  public async create(dto: CreateRecipeDTO, ownerId: number): Promise<RecipeEntity> {
    return this.repository.save(
      plainToInstance(RecipeEntity, { ...dto, owner: { id: ownerId } })
    )
      .then(entity => this.findOne(entity.id));
  }


  public findAll(ownerId: number): Promise<RecipeEntity[]> {
    return this.repository.findBy({ owner: { id: ownerId } });
  }


  public async findOne(id: number): Promise<RecipeEntity> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Entity with ID: ${ id } not exists.`);
    }
    return entity;
  }


  public async update(id: number, dto: UpdateRecipeDTO): Promise<RecipeEntity> {
    return this.repository.update(id, dto)
      .then(() => this.findOne(id));
  }


  public async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
