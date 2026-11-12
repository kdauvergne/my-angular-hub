import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceSignals } from './exercice-signals';

describe('ExerciceSignals', () => {
  let component: ExerciceSignals;
  let fixture: ComponentFixture<ExerciceSignals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceSignals],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceSignals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
