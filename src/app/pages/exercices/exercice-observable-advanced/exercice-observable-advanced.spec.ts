import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceObservableAdvanced } from './exercice-observable-advanced';

describe('ExerciceObservableAdvanced', () => {
  let component: ExerciceObservableAdvanced;
  let fixture: ComponentFixture<ExerciceObservableAdvanced>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceObservableAdvanced],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceObservableAdvanced);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
