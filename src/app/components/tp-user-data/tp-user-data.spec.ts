import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TpUserData } from './tp-user-data';

describe('TpUserData', () => {
  let component: TpUserData;
  let fixture: ComponentFixture<TpUserData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpUserData],
    }).compileComponents();

    fixture = TestBed.createComponent(TpUserData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
