import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceTaskListFirebase } from './exercice-task-list-firebase';

describe('ExerciceTaskListFirebase', () => {
  let component: ExerciceTaskListFirebase;
  let fixture: ComponentFixture<ExerciceTaskListFirebase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceTaskListFirebase],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceTaskListFirebase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
