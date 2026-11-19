import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TpUserActive } from './tp-user-active';

describe('TpUserActive', () => {
  let component: TpUserActive;
  let fixture: ComponentFixture<TpUserActive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpUserActive],
    }).compileComponents();

    fixture = TestBed.createComponent(TpUserActive);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
