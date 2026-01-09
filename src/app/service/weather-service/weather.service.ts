// weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class WeatherService {
  private apiKey = 'b99296c12b6059b83273ecaa758af601';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor (private http: HttpClient) {}

  getForecastWithCity(city: string, units:  'metric' | 'imperial'): Observable<any>{
    return this.http.get<any>(
      `${this.baseUrl}?q=${city}&units=${units}&appid=${this.apiKey}`
    );
  }

  getForecastWithCoords(lon: number, lat: number, units:  'metric' | 'imperial'): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}?lon=${lon}&lat=${lat}&units=${units}&appid=${this.apiKey}`
    );
  }
}
