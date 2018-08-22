import { Task } from './../../shared/models/task';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countTask'
})
export class CountTaskPipe implements PipeTransform {

  transform(tasks: Task [], type: string): number {
    let all = tasks.length;
    let active = 0;
    let completed = 0;

    for (let task of tasks) {
      if (task.is_completed) {
        completed++;
      } else {
        active++;
      }
    }

    switch (type) {
      case 'active':
        return active;
      case 'all':
        return all;
      case 'completed':
        return completed;
      default:
        break;
    }
  }

}
