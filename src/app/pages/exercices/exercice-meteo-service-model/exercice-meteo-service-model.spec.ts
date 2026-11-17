import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceMeteoServiceModel } from './exercice-meteo-service-model';

describe('ExerciceMeteoServiceModel', () => {
  let component: ExerciceMeteoServiceModel;
  let fixture: ComponentFixture<ExerciceMeteoServiceModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceMeteoServiceModel],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceMeteoServiceModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
