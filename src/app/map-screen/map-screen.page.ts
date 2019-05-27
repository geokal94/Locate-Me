import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';

declare var google;

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.page.html',
  styleUrls: ['./map-screen.page.scss'],
})

export class MapScreenPage implements OnInit, AfterContentInit {
  map;
  @ViewChild('mapElement') mapElement;
  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
  }
}