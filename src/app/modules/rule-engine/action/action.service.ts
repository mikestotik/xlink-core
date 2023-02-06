import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateActionDTO, UpdateActionDTO } from './action.dto';
import { ActionEntity } from './action.entity';


@Injectable()
export class ActionService {

  constructor(
    @InjectRepository(ActionEntity)
    private readonly actionRepository: Repository<ActionEntity>) {
  }


  public async create(dto: CreateActionDTO, ownerId: number): Promise<ActionEntity> {
    return this.actionRepository.save(
      plainToInstance(ActionEntity, { ...dto, owner: { id: ownerId } })
    )
      .then(entity => this.findOne(entity.id));
  }


  public findAll(ownerId: number): Promise<ActionEntity[]> {
    return this.actionRepository.findBy({ owner: { id: ownerId } });
  }


  public async findOne(id: number): Promise<ActionEntity> {
    const entity = await this.actionRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Entity with ID: ${ id } not exists.`);
    }
    return entity;
  }


  public async update(id: number, dto: UpdateActionDTO): Promise<ActionEntity> {
    return this.actionRepository.update(id, dto)
      .then(() => this.findOne(id));
  }


  public async remove(id: number): Promise<void> {
    await this.actionRepository.delete(id);
  }
}
