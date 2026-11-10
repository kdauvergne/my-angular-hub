import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceEventBinding } from './exercice-event-binding';

describe('ExerciceEventBinding', () => {
  let component: ExerciceEventBinding;
  let fixture: ComponentFixture<ExerciceEventBinding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceEventBinding],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceEventBinding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
