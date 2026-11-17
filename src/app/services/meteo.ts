import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { MeteoResponse } from '../models/meteo.model';

@Service()
export class MeteoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://prevision-meteo.ch/services/json';

  getMeteoByCity(city: string): Observable<MeteoResponse> {
    return this.http.get<MeteoResponse>(`${this.apiUrl}/${city}`);
  }
}
