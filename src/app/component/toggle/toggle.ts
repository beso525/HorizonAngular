import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  templateUrl: './toggle.html',
  styleUrl: './toggle.scss',
})
export class ToggleComponent {
  @Output() unitChanged = new EventEmitter<void>();

  toggle() {
    this.unitChanged.emit();
  }
}
