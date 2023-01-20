import { Exclude, Expose } from 'class-transformer';
import { Languages } from '../../../enums/languages.enum';
import { RoleDTO } from '../role/role.dto';
import { RoleEntity } from '../role/role.entity';


export interface UserCredentials {
  email: string;
  password: string;
}


export class CreateUserDTO implements UserCredentials {
  email!: string;
  password!: string;
  username?: string;
  lang?: Languages;
  roles?: RoleEntity[];
}


@Exclude()
export class UserDTO {
  @Expose()
  id!: number;

  @Expose()
  email!: string;

  @Expose()
  username!: string;

  @Expose()
  lang!: Languages;

  @Expose()
  created!: Date;

  @Expose()
  updated!: Date;

  @Expose()
  roles?: RoleDTO[];
}


@Exclude()
export class SharedUserDTO {
  @Expose()
  id!: number;

  @Expose()
  email!: string;

  @Expose()
  username!: string;

}


export class UpdateUserDTO {
  lang?: Languages;
}
