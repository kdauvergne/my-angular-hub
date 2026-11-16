import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Digimon, DigimonResponse } from '../../../models/digimon.model';

@Component({
  imports: [],
  selector: 'app-exercice-api-http-client',
  styleUrl: './exercice-api-http-client.css',
  templateUrl: './exercice-api-http-client.html',
})
export class ExerciceApiHttpClient implements OnInit {
  private http = inject(HttpClient);

  digimons = signal<Digimon[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  // pagination
  currentPage = signal<number>(0);
  totalPages = signal<number>(0);

  ngOnInit() {
    this.loadPage(0);
  }

  loadPage(page: number): void {
    this.isLoading.set(true);

    this.http.get<DigimonResponse>(`https://digi-api.com/api/v1/digimon?page=${page}`).subscribe({
      next: (data) => {
        this.digimons.set(data.content);
        this.currentPage.set(data.pageable.currentPage);
        this.totalPages.set(data.pageable.totalPages);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Impossible de charger les Digimons');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  previousPage(): void {
    this.loadPage(this.currentPage() - 1);
  }

  nextPage(): void {
    this.loadPage(this.currentPage() + 1);
  }
}
