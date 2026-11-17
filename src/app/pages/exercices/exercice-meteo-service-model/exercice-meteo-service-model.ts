import { Component, signal, inject, OnInit } from '@angular/core';
import { MeteoService } from '../../../services/meteo';
import { MeteoResponse } from '../../../models/meteo.model';

@Component({
  imports: [],
  selector: 'app-exercice-meteo-service-model',
  styleUrl: './exercice-meteo-service-model.css',
  templateUrl: './exercice-meteo-service-model.html',
})
export class ExerciceMeteoServiceModel implements OnInit {
  private readonly meteoService = inject(MeteoService);

  meteoData = signal<MeteoResponse | null>(null);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.isLoading.set(true);
    this.meteoService.getMeteoByCity('toulouse').subscribe({
      next: (data) => {
        console.log(data);
        this.meteoData.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Impossible de charger la météo');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }
}
