import { Component, signal } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { ShikiPipe } from '../../../pipes/shiki.pipe';

export interface Framework {
  id: number;
  name: string;
  category: string;
}

@Component({
  selector: 'app-list-rendering-lesson',
  imports: [NgFor, NgIf, AsyncPipe, ShikiPipe], // NgFor et NgIf conservés pour la démo visuelle "Ancienne Syntaxe"
  styleUrl: './list-rendering-lesson.css',
  templateUrl: './list-rendering-lesson.html',
})
export class ListRenderingLesson {
  private readonly initialData: Framework[] = [
    { id: 1, name: 'Angular', category: 'Frontend' },
    { id: 2, name: 'NestJS', category: 'Backend' },
    { id: 3, name: 'Svelte', category: 'Frontend' },
    { id: 4, name: 'PostgreSQL', category: 'Database' },
  ];

  items = signal<Framework[]>([...this.initialData]);

  // Snippets de code bruts pour Shiki
  codeOldSyntax: string = `<!-- Directive + function trackBy dans la classe TS -->
<div *ngFor="let item of items(); trackBy: trackById">
  <p>{{ item.name }}</p>
</div>

<!-- Gestion du cas vide à la main avec *ngIf -->
<div *ngIf="items().length === 0">
  <p>Aucun élément trouvé.</p>
</div>`;

  codeNewSyntax: string = `<!-- Control Flow moderne avec expression track inline -->
@for (item of items(); track item.id) {
  <p>{{ item.name }}</p>
} @empty {
  <!-- Gestion native et élégante du cas vide -->
  <p>Aucun élément trouvé.</p>
}`;

  trackById(index: number, item: Framework): number {
    return item.id;
  }

  addItem(): void {
    const id = Date.now();
    const tools = ['Vue.js', 'Express', 'Docker', 'Redis', 'Tailwind', 'GraphQL'];
    const randomName = tools[Math.floor(Math.random() * tools.length)];
    this.items.update((list) => [...list, { id, name: randomName, category: 'Outil' }]);
  }

  removeItem(id: number): void {
    this.items.update((list) => list.filter((item) => item.id !== id));
  }

  clearList(): void {
    this.items.set([]);
  }

  resetList(): void {
    this.items.set([...this.initialData]);
  }
}
