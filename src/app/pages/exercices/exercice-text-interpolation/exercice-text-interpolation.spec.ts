import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceTextInterpolation } from './exercice-text-interpolation';

describe('ExerciceTextInterpolation', () => {
  let component: ExerciceTextInterpolation;
  let fixture: ComponentFixture<ExerciceTextInterpolation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceTextInterpolation],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceTextInterpolation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
