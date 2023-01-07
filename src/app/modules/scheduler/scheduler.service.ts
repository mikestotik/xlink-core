import { Injectable } from '@nestjs/common';
import { Job, scheduleJob } from 'node-schedule';
import { Observable, Subject, tap } from 'rxjs';


@Injectable()
export class SchedulerService {

  private readonly event = new Subject<number>();
  private readonly jobs: Map<number, Job> = new Map<number, Job>();


  public addJob(taskId: number, datetime: Date): void {
    this.jobs.set(taskId, scheduleJob(datetime, () => this.event.next(taskId)));
  }


  public removeJob(taskId: number): void {
    const job = this.jobs.get(taskId);
    if (job) {
      job.cancel();
      this.jobs.delete(taskId);
    }
  }


  public updateJob(taskId: number, datetime: Date): void {
    this.removeJob(taskId);
    this.addJob(taskId, datetime);
  }


  public onEvent(): Observable<number> {
    return this.event.asObservable().pipe(
      tap(taskId => this.removeJob(taskId)),
    );
  }
}