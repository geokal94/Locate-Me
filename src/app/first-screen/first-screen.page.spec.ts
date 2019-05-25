import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstScreenPage } from './first-screen.page';

describe('FirstScreenPage', () => {
  let component: FirstScreenPage;
  let fixture: ComponentFixture<FirstScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstScreenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
