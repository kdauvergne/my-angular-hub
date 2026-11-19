import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskItem } from '../../../components/task-item/task-item';
import { TaskService } from '../../../services/task-promise.service';
import { Task } from '../../../models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [TaskItem, FormsModule],
  selector: 'app-exercice-task-list-firebase',
  styleUrl: './exercice-task-list-firebase.css',
  template: `
    <!-- Parent : liste des tâches -->
    <div class="max-w-lg mx-auto my-10 p-4 space-y-8">
      <h1 class="text-4xl font-extrabold text-primary text-center">Liste des tâches</h1>

      <!-- Formulaire d'ajout -->
      <form class="flex gap-3" (ngSubmit)="addTask()">
        <input
          type="text"
          name="newTaskTitle"
          class="input w-full"
          placeholder="Nouvelle tâche"
          [(ngModel)]="newTaskTitle"
        />
        <button type="submit" class="btn btn-primary" [disabled]="!newTaskTitle().trim()">
          Ajouter
        </button>
      </form>

      <!-- Liste des tâches -->
      <div class="space-y-3">
        @for (task of tasks(); track task.id) {
          <app-task-item
            [task]="task"
            (statusChange)="toggleStatus(task)"
            (taskDelete)="deleteTask(task.id!)"
          />
        } @empty {
          <p class="text-center text-base-content/60">Aucune tâche pour le moment.</p>
        }
      </div>
    </div>
  `,
})
export class ExerciceTaskListFirebase implements OnInit {
  private readonly taskService = inject(TaskService);

  readonly tasks = signal<Task[]>([]);
  newTaskTitle = signal<string>('');

  async ngOnInit(): Promise<void> {
    await this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    try {
      const data = await this.taskService.getTasks();
      this.tasks.set(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
    }
  }

  async addTask(): Promise<void> {
    const title = this.newTaskTitle().trim();
    if (!title) return;

    try {
      const newTask: Task = { title, status: 'pending' };
      await this.taskService.addTask(newTask);
      await this.loadTasks();
      this.newTaskTitle.set('');
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
    }
  }

  async toggleStatus(task: Task): Promise<void> {
    try {
      const status = task.status === 'pending' ? 'completed' : 'pending';
      await this.taskService.updateTask({ ...task, status });
      await this.loadTasks();
    } catch (error) {
      console.error('Erreur lors du changement de statut :', error);
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    try {
      await this.taskService.deleteTask(taskId);
      await this.loadTasks();
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error);
    }
  }
}
