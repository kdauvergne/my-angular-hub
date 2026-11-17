import { computed, Injectable, signal } from '@angular/core';

export interface AppNotification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning';
  timestamp: string;
  read: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // État privé : seul le service peut le modifier
  private readonly _notifications = signal<AppNotification[]>([]);

  // Exposition publique en lecture seule
  readonly notifications = this._notifications.asReadonly();
  readonly unreadCount = computed(() => this._notifications().filter((n) => !n.read).length);

  addNotification(message: string, type: AppNotification['type']): void {
    const notification: AppNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
      read: false,
    };
    this._notifications.update((list) => [notification, ...list]);
  }

  markAllAsRead(): void {
    this._notifications.update((list) => list.map((n) => ({ ...n, read: true })));
  }

  removeNotification(id: number): void {
    this._notifications.update((list) => list.filter((n) => n.id !== id));
  }

  clearAll(): void {
    this._notifications.set([]);
  }
}
