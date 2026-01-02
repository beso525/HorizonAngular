import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreWeather } from './explore-weather';

describe('ExploreWeather', () => {
  let component: ExploreWeather;
  let fixture: ComponentFixture<ExploreWeather>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreWeather]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreWeather);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
