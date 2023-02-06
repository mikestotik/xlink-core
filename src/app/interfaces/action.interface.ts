import { ActionType } from '../enums/action.enum';


export interface Action {
  title: string;
  desc?: string;
  type: ActionType;
  payload: string;
  disabled?: boolean;
}
