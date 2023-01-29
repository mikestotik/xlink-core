import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { AssetEntity } from '../../asset-manager/asset/asset.entity';
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
    return this.repository.update(id, {
      triggered: dto.triggered,
      title: dto.title,
      desc: dto.desc,
      chain: dto.chain,
      recoveryTime: dto.recoveryTime,
      recoveryTrigger: dto.recoveryTrigger,
      conditions: dto.conditions,
    })
      .then(() => this.findOne(id));
  }


  public async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }


  public async addAsset(id: number, assetId: number): Promise<TriggerEntity> {
    const entity = await this.findOne(id);
    entity.addAsset({ id: assetId } as AssetEntity);

    return this.repository.save(entity)
      .then(() => this.findOne(id));
  }


  public async removeAsset(id: number, assetId: number): Promise<TriggerEntity> {
    const entity = await this.findOne(id);
    entity.removeAsset(assetId);

    return this.repository.save(entity)
      .then(() => this.findOne(id));
  }
}
