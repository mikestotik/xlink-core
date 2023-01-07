import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/entity.class';
import { Role } from '../../interfaces/role.interface';


@Entity('roles')
export class RoleEntity extends BaseEntity implements Role {

  @Column({ unique: true })
  title!: string;
}
