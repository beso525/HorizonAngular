import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayForecast } from './today-forecast';

describe('TodayForecast', () => {
  let component: TodayForecast;
  let fixture: ComponentFixture<TodayForecast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayForecast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayForecast);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
