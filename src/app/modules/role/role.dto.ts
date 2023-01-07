import { PartialType } from '@nestjs/mapped-types';
import { BaseEntityDTO } from '../../database/entity.class';
import { Role } from '../../interfaces/role.interface';


export class CreateRoleDTO implements Role {
  title!: string;
}


export class UpdateRoleDTO extends PartialType(CreateRoleDTO) {}


export class RoleDTO extends BaseEntityDTO implements Role {
  id!: number;
  title!: string;
  created!: Date;
  updated!: Date;
}
