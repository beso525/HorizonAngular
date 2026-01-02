import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWeather } from './my-weather';

describe('MyWeather', () => {
  let component: MyWeather;
  let fixture: ComponentFixture<MyWeather>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyWeather]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyWeather);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
