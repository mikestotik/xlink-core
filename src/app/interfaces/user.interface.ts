import { Languages } from '../enums/languages.enum';
import { Role } from './role.interface';


export interface User {
  email: string;
  username: string;
  password: string;
  lang?: Languages;
  activated?: boolean;
  refresh?: string;
  roles?: Role[];
}