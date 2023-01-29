import { ConditionalOperator } from '../enums/condition.enum';


export class TriggerCondition {
  operator!: ConditionalOperator;
  value!: string;
  chain!: string;
}


export interface Trigger {
  title: string;
  desc?: string;
  chain?: string;
  color?: string;
  recoveryTime?: number;
  recoveryTrigger?: number;
  triggered?: boolean;
  disabled?: boolean;
  conditions?: TriggerCondition[];
}