import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { MeteoResponse } from '../models/meteo.model';

@Service()
export class MeteoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://prevision-meteo.ch/services/json';

  getMeteoByCity(city: string = 'toulouse'): Observable<MeteoResponse> {
    const formattedCity = city.trim().toLowerCase() || 'toulouse';
    return this.http.get<MeteoResponse>(`${this.apiUrl}/${encodeURIComponent(formattedCity)}`);
  }
}
