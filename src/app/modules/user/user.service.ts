import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Role } from '../../enums/role.enum';
import { generateCode } from '../../utils/common.utils';
import { CryptoUtils } from '../../utils/crypto.utils';
import { EmailUtils } from '../../utils/email.utils';
import { RoleService } from '../role/role.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { UserEntity } from './user.entity';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly roleService: RoleService) {
  }


  public findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }


  public async findOne(id: number): Promise<UserEntity> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID: ${ id } is not exists`);
    }
    return user;
  }


  public findByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({ email });
  }


  public async create(dto: CreateUserDTO): Promise<UserEntity> {
    EmailUtils.validate(dto.email);

    const user = await this.findByEmail(dto.email);

    if (user) {
      throw new BadRequestException('User exists');
    }

    let password: string;

    if (!dto.password) {
      throw new BadRequestException('Password is required');
    } else {
      password = CryptoUtils.hash(dto.password);
    }

    if (!dto.username) {
      dto.username = EmailUtils.parseUsername(dto.email) + generateCode();
    }

    if (!dto.roles) {
      const userRole = await this.roleService.findByName(Role.User);
      if (!userRole) {
        throw new InternalServerErrorException('Default role not found');
      }
      dto.roles = [ userRole ];
    }

    const saved = this.repository.save({ ...dto, password });

    if (!saved) {
      throw new InternalServerErrorException('User is not created');
    }
    return saved;
  }


  public update(id: number, dto: UpdateUserDTO): Promise<UserEntity> {
    return this.repository.update(id, dto)
      .then(() => this.findOne(id));
  }


  public updateRefreshToken(id: number, refreshToken: string): Promise<UpdateResult> {
    return this.repository.update(id, { refresh: refreshToken });
  }


  public async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }


  public async validateUser(email: string, pass: string): Promise<UserEntity> {
    EmailUtils.validate(email);

    if (!pass) {
      throw new BadRequestException('Password is required');
    }

    const user = await this.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    if (!CryptoUtils.compareHashes(pass, user.password)) {
      throw new BadRequestException('Incorrect password');
    }

    if (!user.activated) {
      throw new ForbiddenException('Not activated');
    }

    return user;
  }


  public async activate(email: string): Promise<UpdateResult> {
    EmailUtils.validate(email);

    const user = await this.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User not exists');
    }

    if (user.activated) {
      throw new BadRequestException('Already activated');
    }

    return this.repository.update(user.id, { activated: true });
  }

}