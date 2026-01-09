import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private metric = true;

  isMetric() {
    return this.metric;
  }

  toggle() {
    this.metric = !this.metric;
  }
}
