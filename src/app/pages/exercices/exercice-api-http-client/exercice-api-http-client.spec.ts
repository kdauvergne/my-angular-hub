import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceApiHttpClient } from './exercice-api-http-client';

describe('ExerciceApiHttpClient', () => {
  let component: ExerciceApiHttpClient;
  let fixture: ComponentFixture<ExerciceApiHttpClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceApiHttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceApiHttpClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
