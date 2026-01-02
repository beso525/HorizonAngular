import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as maplibre from 'maplibre-gl'

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map implements AfterViewInit {
  
  @ViewChild('map')
  mapRef!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    const map = new maplibre.Map({
      container: this.mapRef.nativeElement,
      style: 'https://api.maptiler.com/maps/hybrid/style.json?key=5Vw5zZMQz02YaWEmLTTg',
      center: [0,0],
      zoom: 2
    })

    map.on('mousedown', e =>
      console.log(e)
    )
  }

}
