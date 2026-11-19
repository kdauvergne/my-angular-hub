import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TpComponentCommunication } from './tp-component-communication';

describe('TpComponentCommunication', () => {
  let component: TpComponentCommunication;
  let fixture: ComponentFixture<TpComponentCommunication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpComponentCommunication],
    }).compileComponents();

    fixture = TestBed.createComponent(TpComponentCommunication);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
