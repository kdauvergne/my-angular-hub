import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceDynamicStyling } from './exercice-dynamic-styling';

describe('ExerciceDynamicStyling', () => {
  let component: ExerciceDynamicStyling;
  let fixture: ComponentFixture<ExerciceDynamicStyling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceDynamicStyling],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceDynamicStyling);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
