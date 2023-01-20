import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateStepDTO, UpdateStepDTO } from '../dto/recipe-step.dto';
import { StepEntity } from '../entities/recipe-step.entity';


@Injectable()
export class StepService {

  constructor(
    @InjectRepository(StepEntity)
    private readonly stepRepository: Repository<StepEntity>) {
  }


  public async create(dto: CreateStepDTO, ownerId: number): Promise<StepEntity> {
    return this.stepRepository.save(
      plainToInstance(StepEntity, { ...dto, owner: { id: ownerId } })
    )
      .then(entity => this.findOne(entity.id));
  }


  public findAll(ownerId: number): Promise<StepEntity[]> {
    return this.stepRepository.findBy({ owner: { id: ownerId } });
  }


  public async findOne(id: number): Promise<StepEntity> {
    const entity = await this.stepRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Entity with ID: ${ id } not exists.`);
    }
    return entity;
  }


  public async update(id: number, dto: UpdateStepDTO): Promise<StepEntity> {
    return this.stepRepository.update(id, dto)
      .then(() => this.findOne(id));
  }


  public async remove(id: number): Promise<void> {
    await this.stepRepository.delete(id);
  }
}
