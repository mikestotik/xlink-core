import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateTriggerDTO, UpdateTriggerDTO } from './trigger.dto';
import { TriggerEntity } from './trigger.entity';


@Injectable()
export class TriggerService {

  constructor(
    @InjectRepository(TriggerEntity)
    private readonly repository: Repository<TriggerEntity>) {
  }


  public async create(dto: CreateTriggerDTO, ownerId: number): Promise<TriggerEntity> {
    return this.repository.save(
      plainToInstance(TriggerEntity, { ...dto, owner: { id: ownerId } })
    )
      .then(entity => this.findOne(entity.id));
  }


  public findAll(ownerId: number): Promise<TriggerEntity[]> {
    return this.repository.findBy({ owner: { id: ownerId } });
  }


  public async findOne(id: number): Promise<TriggerEntity> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Entity with ID: ${ id } not exists.`);
    }
    return entity;
  }


  public async update(id: number, dto: UpdateTriggerDTO): Promise<TriggerEntity> {
    return this.repository.update(id, dto)
      .then(() => this.findOne(id));
  }


  public async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
