import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceObservableSimple } from './exercice-observable-simple';

describe('ExerciceObservableSimple', () => {
  let component: ExerciceObservableSimple;
  let fixture: ComponentFixture<ExerciceObservableSimple>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceObservableSimple],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceObservableSimple);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
