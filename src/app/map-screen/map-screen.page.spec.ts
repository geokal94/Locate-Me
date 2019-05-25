import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapScreenPage } from './map-screen.page';

describe('MapScreenPage', () => {
  let component: MapScreenPage;
  let fixture: ComponentFixture<MapScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapScreenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
