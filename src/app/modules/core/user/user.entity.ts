import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../database/entity.class';
import { Languages } from '../../../enums/languages.enum';
import { User } from '../../../interfaces/user.interface';
import { RoleEntity } from '../role/role.entity';


@Entity('users')
export class UserEntity extends BaseEntity implements User {

  @Column({ unique: true, length: 32 })
  email!: string;

  @Column({ unique: true, length: 32 })
  username!: string;

  @Column()
  password!: string;

  @Column({ type: 'enum', enum: Languages, default: Languages.EN })
  lang?: Languages;

  @Column({ default: false })
  activated?: boolean;

  @Column({ nullable: true })
  refresh?: string;

  @JoinTable({ name: 'users_roles' })
  @ManyToMany(() => RoleEntity, { cascade: true, eager: true })
  roles?: RoleEntity[];

}
