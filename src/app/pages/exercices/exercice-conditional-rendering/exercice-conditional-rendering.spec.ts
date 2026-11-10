import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceConditionalRendering } from './exercice-conditional-rendering';

describe('ExerciceConditionalRendering', () => {
  let component: ExerciceConditionalRendering;
  let fixture: ComponentFixture<ExerciceConditionalRendering>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceConditionalRendering],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceConditionalRendering);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
