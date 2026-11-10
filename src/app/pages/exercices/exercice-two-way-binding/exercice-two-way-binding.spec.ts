import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceTwoWayBinding } from './exercice-two-way-binding';

describe('ExerciceTwoWayBinding', () => {
  let component: ExerciceTwoWayBinding;
  let fixture: ComponentFixture<ExerciceTwoWayBinding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceTwoWayBinding],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceTwoWayBinding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
