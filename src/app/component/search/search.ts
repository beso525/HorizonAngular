// search.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})

export class SearchComponent {
  @Output() citySelected = new EventEmitter<string>();
  submit(city: string) {
    const trimCity = city.trim();    
    if (!trimCity) return;
    this.citySelected.emit(trimCity);
  }
}
