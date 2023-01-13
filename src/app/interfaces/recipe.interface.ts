import { WeekDays } from '../enums/calendar.enum';
import { ConditionalOperator, TimeConditionType } from '../enums/condition.enum';
import { NotificationMethod, NotificationType } from '../enums/notification.enum';
import { ActionType, RuleType } from '../enums/rule.enum';
import { StepStatus, StepType } from '../enums/step.enum';
import { Asset } from './asset.interface';


export interface Recipe {
  title: string;
  desc?: string;
  // steps
}


export interface Step {
  title: string;
  desc?: string;
  timer?: Date;
  order: number;
  status: StepStatus;
  type: StepType;
  // rules
}


export interface NotificationRuleActionPayload {
  method: NotificationMethod;
  type: NotificationType;
  text: string;
}


export interface StepRuleActionPayload {
  step: Step;
}


export interface AssetRuleActionPayload<T = number> {
  asset: Asset;
  value: T;
}


export interface RuleAction {
  type: ActionType;
  payload: NotificationRuleActionPayload | StepRuleActionPayload | AssetRuleActionPayload;
}


export interface TimeRuleCondition {
  type: TimeConditionType;
  time: Date;
  interval: number;
  days: WeekDays;
}


export interface AssetRuleCondition<T = number> {
  asset: Asset;
  operator: ConditionalOperator;
  value: T;
  /**
   * true = 'is' | false = 'is not'
   * */
  is: boolean;
  /**
   *  true = 'or' | false = 'and'
   *  */
  or: boolean;
}


export interface Rule {
  title: string;
  desc?: string;
  type: RuleType;
  conditions: TimeRuleCondition | AssetRuleCondition;
  // actions: RuleAction[];
  step: Step;
}