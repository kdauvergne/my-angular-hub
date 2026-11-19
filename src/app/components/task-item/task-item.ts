import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  imports: [],
  selector: 'app-task-item',
  styleUrl: './task-item.css',
  template: `
    <!-- Enfant : une tâche -->
    <div class="card bg-base-100 shadow-md">
      <div class="card-body flex-row items-center justify-between gap-4 p-4">
        <span class="text-lg">{{ task().title }}</span>
        <div class="flex items-center gap-2">
          <span
            class="badge"
            [class.badge-success]="task().status === 'completed'"
            [class.badge-warning]="task().status === 'pending'"
            >{{ task().status }}</span
          >
          <button type="button" class="btn btn-info btn-sm" (click)="statusChange.emit()">
            Statut
          </button>
          <button type="button" class="btn btn-error btn-sm" (click)="taskDelete.emit()">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  `,
})
export class TaskItem {
  readonly task = input.required<Task>();

  // Événements vers le parent
  readonly statusChange = output<void>();
  readonly taskDelete = output<void>();
}
