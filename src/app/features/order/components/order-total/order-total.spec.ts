import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderTotal } from './order-total';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

describe('OrderTotal', () => {
  let component: OrderTotal;
  let fixture: ComponentFixture<OrderTotal>;

  beforeEach(async () => {

    registerLocaleData(localePt);
    
    await TestBed.configureTestingModule({
      imports: [OrderTotal],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderTotal);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default total as 0', () => {
    expect(component.total).toBe(0);
  });

  it('should accept total input value', () => {
    component.total = 150.75;
    fixture.detectChanges();
    expect(component.total).toBe(150.75);
  });
});
