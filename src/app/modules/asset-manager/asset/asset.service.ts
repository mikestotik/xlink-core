import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateAssetDTO, UpdateAssetDTO } from './asset.dto';
import { AssetEntity } from './asset.entity';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(AssetEntity)
    private readonly repository: Repository<AssetEntity>,
  ) {}

  public async create(
    dto: CreateAssetDTO,
    ownerId: number,
  ): Promise<AssetEntity> {
    return this.repository
      .save(plainToInstance(AssetEntity, { ...dto, owner: { id: ownerId } }))
      .then((entity) => this.findOne(entity.id));
  }

  public findAllByOwner(ownerId: number): Promise<AssetEntity[]> {
    return this.repository.findBy({ owner: { id: ownerId } });
  }

  public findByDevice(id: number): Promise<AssetEntity[]> {
    return this.repository.findBy({ device: { id } });
  }

  public async findOne(id: number): Promise<AssetEntity> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Entity with ID: ${id} not exists.`);
    }
    return entity;
  }

  public async update(id: number, dto: UpdateAssetDTO): Promise<AssetEntity> {
    return this.repository.update(id, dto).then(() => this.findOne(id));
  }

  public async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
