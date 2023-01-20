import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateConfirmDTO } from './confirm.dto';
import { ConfirmEntity } from './confirm.entity';


@Injectable()
export class ConfirmService {

  constructor(
    @InjectRepository(ConfirmEntity)
    private readonly repository: Repository<ConfirmEntity>) {
  }


  public create(ownerId: number, dto: CreateConfirmDTO) {
    return this.repository.save(
      plainToInstance(ConfirmEntity, { ...dto, owner: { id: ownerId } }),
    );
  }


  public findByCode(code: number): Promise<ConfirmEntity | null> {
    return this.repository.findOneBy({ code });
  }

}
