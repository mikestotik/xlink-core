export interface Trigger {
  title: string;
  desc?: string;
  recoveryTime?: Date;
  recoveryTrigger?: Trigger;
  triggered?: boolean;
}