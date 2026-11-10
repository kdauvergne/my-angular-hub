import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { codeToHtml } from 'shiki';

@Pipe({
  name: 'shiki',
})
export class ShikiPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  async transform(
    code: string,
    lang: string = 'bash',
    theme: string = 'github-dark',
  ): Promise<SafeHtml> {
    if (!code) return '';

    // Génération du HTML coloré par Shiki
    const highlightedHtml = await codeToHtml(code, { lang, theme });

    // Sécurisation de l'HTML pour l'affichage via [innerHTML]
    return this.sanitizer.bypassSecurityTrustHtml(highlightedHtml);
  }
}
