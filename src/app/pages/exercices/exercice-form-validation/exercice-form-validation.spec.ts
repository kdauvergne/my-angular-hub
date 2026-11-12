import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceFormValidation } from './exercice-form-validation';

describe('ExerciceFormValidation', () => {
  let component: ExerciceFormValidation;
  let fixture: ComponentFixture<ExerciceFormValidation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceFormValidation],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceFormValidation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
