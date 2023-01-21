import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateDeviceDTO, UpdateDeviceDTO } from './device.dto';
import { DeviceEntity } from './device.entity';


@Injectable()
export class DeviceService {

  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>) {
  }


  public async create(dto: CreateDeviceDTO, ownerId: number): Promise<DeviceEntity> {
    if (await this.isExists(dto.uuid)) {
      throw new BadRequestException(`Entity with UUID: ${ dto.uuid } exists.`);
    }
    return this.deviceRepository.save(
      plainToInstance(DeviceEntity, { ...dto, owner: { id: ownerId } })
    )
      .then(entity => this.findOne(entity.id));
  }


  public findAllByOwner(ownerId: number): Promise<DeviceEntity[]> {
    return this.deviceRepository.findBy({ owner: { id: ownerId } });
  }


  public findAll(): Promise<DeviceEntity[]> {
    return this.deviceRepository.find();
  }


  public async findOne(id: number): Promise<DeviceEntity> {
    const entity = await this.deviceRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Entity with ID: ${ id } not exists.`);
    }
    return entity;
  }


  public async update(id: number, dto: UpdateDeviceDTO): Promise<DeviceEntity> {
    return this.deviceRepository.update(id, dto)
      .then(() => this.findOne(id));
  }


  public async remove(id: number): Promise<void> {
    await this.deviceRepository.delete(id);
  }


  public isExists(mac: string): Promise<boolean> {
    return this.deviceRepository.exist({ where: { uuid: mac } });
  }
}
