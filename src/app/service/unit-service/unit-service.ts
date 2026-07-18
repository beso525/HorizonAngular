import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UnitService {

  isMetric = signal<boolean>(true);

  toggle() {
    this.isMetric.update((prev) => !prev);
    console.log('unitservice: metric is ', this.isMetric());
  }
}
