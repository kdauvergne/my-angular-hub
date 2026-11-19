import { Database, get, push, ref, remove, set, update } from '@angular/fire/database';
import { inject, Service } from '@angular/core';
import { Task } from '../models/task.model';

@Service()
export class TaskService {
  // injection de Database
  private readonly db = inject(Database);

  // initialise une référence globale vers le noeud 'tasks' avec ref()
  private readonly tasksRef = ref(this.db, 'tasks');

  // méthode getTasks() - lire une tâche
  async getTasks(): Promise<Task[]> {
    const snapshot = await get(this.tasksRef);
    const data = snapshot.val();

    // Base vide : Firebase renvoie null
    if (!data) return [];

    return Object.entries(data).map(([id, task]) => ({
      id,
      ...(task as Task),
    }));
  }

  // Ajouter une tâche (Firebase génère l'ID via push)
  async addTask(task: Omit<Task, 'id'>): Promise<void> {
    const newTaskRef = push(this.tasksRef);
    await set(newTaskRef, task);
  }

  // Mettre à jour une tâche existante
  async updateTask(task: Task): Promise<void> {
    if (!task.id) {
      throw new Error('La tâche doit avoir un ID pour être mise à jour.');
    }

    const { id, ...taskData } = task;
    const taskRef = ref(this.db, `tasks/${id}`);
    await update(taskRef, taskData);
  }

  // Supprimer une tâche
  async deleteTask(taskId: string): Promise<void> {
    if (!taskId) {
      throw new Error('L’ID de la tâche est obligatoire pour la suppression.');
    }

    const taskRef = ref(this.db, `tasks/${taskId}`);
    await remove(taskRef);
  }
}
