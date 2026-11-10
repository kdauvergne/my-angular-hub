import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceAttributeBinding } from './exercice-attribute-binding';

describe('ExerciceAttributeBinding', () => {
  let component: ExerciceAttributeBinding;
  let fixture: ComponentFixture<ExerciceAttributeBinding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceAttributeBinding],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceAttributeBinding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
