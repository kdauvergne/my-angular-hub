import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceAnimalInput } from './exercice-animal-input';

describe('ExerciceAnimalInput', () => {
  let component: ExerciceAnimalInput;
  let fixture: ComponentFixture<ExerciceAnimalInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceAnimalInput],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceAnimalInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
