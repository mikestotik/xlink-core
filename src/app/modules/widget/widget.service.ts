import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateWidgetDTO, UpdateWidgetDTO } from './widget.dto';
import { WidgetEntity } from './widget.entity';


@Injectable()
export class WidgetService {

  constructor(
    @InjectRepository(WidgetEntity)
    private readonly widgetRepository: Repository<WidgetEntity>) {
  }


  public async create(dto: CreateWidgetDTO, ownerId: number): Promise<WidgetEntity> {
    return this.widgetRepository.save(
      plainToInstance(WidgetEntity, { ...dto, owner: { id: ownerId } })
    )
      .then(entity => this.findOne(entity.id));
  }


  public findAll(ownerId: number): Promise<WidgetEntity[]> {
    return this.widgetRepository.findBy({ owner: { id: ownerId } });
  }


  public async findOne(id: number): Promise<WidgetEntity> {
    const entity = await this.widgetRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Entity with ID: ${ id } not exists.`);
    }
    return entity;
  }


  public async update(id: number, dto: UpdateWidgetDTO): Promise<WidgetEntity> {
    return this.widgetRepository.update(id, dto)
      .then(() => this.findOne(id));
  }


  public async remove(id: number): Promise<void> {
    await this.widgetRepository.delete(id);
  }

}
