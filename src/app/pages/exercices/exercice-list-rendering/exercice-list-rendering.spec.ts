import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceListRendering } from './exercice-list-rendering';

describe('ExerciceListRendering', () => {
  let component: ExerciceListRendering;
  let fixture: ComponentFixture<ExerciceListRendering>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceListRendering],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceListRendering);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
