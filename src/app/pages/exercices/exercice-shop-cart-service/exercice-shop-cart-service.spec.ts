import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceShopCartService } from './exercice-shop-cart-service';

describe('ExerciceShopCartService', () => {
  let component: ExerciceShopCartService;
  let fixture: ComponentFixture<ExerciceShopCartService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceShopCartService],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceShopCartService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
