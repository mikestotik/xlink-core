import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateRuleDTO, UpdateRuleDTO } from './dto/rule.dto';
import { RuleEntity } from './entities/rule.entity';


@Injectable()
export class RuleService {

  constructor(
    @InjectRepository(RuleEntity)
    private readonly repository: Repository<RuleEntity>) {
  }


  public async create(dto: CreateRuleDTO, ownerId: number): Promise<RuleEntity> {
    return this.repository.save(
      plainToInstance(RuleEntity, { ...dto, owner: { id: ownerId } })
    )
      .then(entity => this.findOne(entity.id));
  }


  public findAll(ownerId: number): Promise<RuleEntity[]> {
    return this.repository.findBy({ owner: { id: ownerId } });
  }


  public async findOne(id: number): Promise<RuleEntity> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Entity with ID: ${ id } not exists.`);
    }
    return entity;
  }


  public async update(id: number, dto: UpdateRuleDTO): Promise<RuleEntity> {
    return this.repository.update(id, dto)
      .then(() => this.findOne(id));
  }


  public async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
