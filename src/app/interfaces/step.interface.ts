import { StepStatus, StepType } from '../enums/step.enum';


export interface Step {
  title: string;
  desc?: string;
  order: number;
  delay?: Date;
  timer?: Date;
  loop?: boolean;
  type: StepType;
  status: StepStatus;
  disabled?: boolean;
}