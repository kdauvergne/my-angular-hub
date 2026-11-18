import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MeteoService } from '../../../services/meteo';
import { ForecastDay, MeteoResponse } from '../../../models/meteo.model';

@Component({
  imports: [FormsModule],
  selector: 'app-exercice-meteo-service-model',
  styleUrl: './exercice-meteo-service-model.css',
  templateUrl: './exercice-meteo-service-model.html',
})
export class ExerciceMeteoServiceModel implements OnInit {
  private readonly meteoService = inject(MeteoService);

  // États réactifs
  readonly meteoData = signal<MeteoResponse | null>(null);
  readonly isLoading = signal<boolean>(true);
  readonly errorMessage = signal<string | null>(null);
  readonly citySearch = signal<string>('Toulouse');

  // Regroupe les 5 jours de prévisions dans un tableau facile à parcourir avec @for
  readonly forecastDays = computed<ForecastDay[]>(() => {
    const data = this.meteoData();
    if (!data) return [];
    return [data.fcst_day_0, data.fcst_day_1, data.fcst_day_2, data.fcst_day_3, data.fcst_day_4];
  });

  ngOnInit() {
    this.loadMeteo(this.citySearch());
  }

  loadMeteo(city: string): void {
    const query = city.trim();
    if (!query) return;

    this.citySearch.set(query);
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.meteoService.getMeteoByCity(query).subscribe({
      next: (response) => {
        // L'API prevision-meteo.ch renvoie HTTP 200 avec un objet "errors" si la ville n'existe pas
        if (!response?.city_info) {
          this.meteoData.set(null);
          this.errorMessage.set(`Aucune donnée météo trouvée pour « ${query} ».`);
          this.isLoading.set(false);
          return;
        }

        this.meteoData.set(response);
        this.isLoading.set(false);
      },
      error: () => {
        this.meteoData.set(null);
        this.errorMessage.set('Erreur réseau lors de la récupération de la météo.');
        this.isLoading.set(false);
      },
    });
  }
}
