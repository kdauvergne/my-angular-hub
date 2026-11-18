import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceAnimalInputOutput } from './exercice-animal-input-output';

describe('ExerciceAnimalInputOutput', () => {
  let component: ExerciceAnimalInputOutput;
  let fixture: ComponentFixture<ExerciceAnimalInputOutput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceAnimalInputOutput],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceAnimalInputOutput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
