import { Component, inject, signal, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { codeToHtml } from 'shiki';

interface Hobbies {
  reading: string;
  cycling: string;
  cooking: string;
}
@Component({
  imports: [],
  selector: 'app-text-interpolation-lesson',
  styleUrl: './text-interpolation-lesson.css',
  templateUrl: './text-interpolation-lesson.html',
})
export class TextInterpolationLesson {
  private sanitizer = inject(DomSanitizer);

  // Données de la leçon
  title: string = 'Bienvenue dans notre cours Angular';
  description: string =
    "La text interpolation vous permet d'afficher des données dynamiques dans votre template.";

  username: string = 'John Doe';
  items: string[] = ['Item 1', 'Item 2', 'Item 3'];
  xss: string = '<script>alert("Hacked!")</script>';

  hobbies: Hobbies = {
    reading: 'Intermédiaire',
    cycling: 'Avancé',
    cooking: 'Débutant',
  };

  // Signals pour stocker le HTML coloré généré par Shiki
  codeSimpleHtml = signal<SafeHtml>('');
  codeObjectHtml = signal<SafeHtml>('');
  codeCalculHtml = signal<SafeHtml>('');
  codeTernaireHtml = signal<SafeHtml>('');
  codeMethodHtml = signal<SafeHtml>('');
  codeXssHtml = signal<SafeHtml>('');

  getWelcomeMessage(): string {
    return `Bienvenue, ${this.username}, dans cette leçon !`;
  }

  async ngOnInit() {
    const theme = 'vitesse-dark';
    const lang = 'html';

    // Helper pour générer le code HTML coloré et le valider pour Angular
    const highlight = async (code: string) => {
      const html = await codeToHtml(code, { lang, theme });
      return this.sanitizer.bypassSecurityTrustHtml(html);
    };

    // Génération des blocs de code
    this.codeSimpleHtml.set(await highlight(`<p>Bonjour, {{ username }} !</p>`));
    this.codeObjectHtml.set(
      await highlight(`<p>{{ hobbies.reading }}</p>\n<p>{{ hobbies['reading'] }}</p>`),
    );
    this.codeCalculHtml.set(await highlight(`<p>10 + 20 = {{ 10 + 20 }}</p>`));
    this.codeTernaireHtml.set(
      await highlight(`<p>{{ username === 'John Doe' ? 'Générique' : 'Spécifique' }}</p>`),
    );
    this.codeMethodHtml.set(await highlight(`<p>{{ getWelcomeMessage() }}</p>`));
    this.codeXssHtml.set(await highlight(`<p>{{ xss }}</p>`));
  }
}
