import { Exclude, Transform } from 'class-transformer';
import { BaseEntityDTO } from '../../database/entity.class';
import { Languages } from '../../enums/languages.enum';
import { RoleDTO } from '../role/role.dto';
import { RoleEntity } from '../role/role.entity';


export class AccountActivateDTO {
  code!: number;
  email!: string;
}


export class AccountDTO extends BaseEntityDTO {
  email!: string;
  username!: string;
  lang!: Languages;

  @Transform(({ value }) => value.map((i: RoleEntity) => i.title))
  roles?: RoleDTO[];

  @Exclude()
  activated!: boolean;

  @Exclude()
  password!: string;

  @Exclude()
  refresh!: string;
}