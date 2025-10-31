import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderHeader } from './order-header';

describe('OrderHeader', () => {
  let component: OrderHeader;
  let fixture: ComponentFixture<OrderHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderHeader);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have today defined as a Date', () => {
    expect(component.today instanceof Date).toBeTrue();
  });

  it('should use provided orderNumber and orderDate inputs', () => {
    const mockOrderNumber = 'ABC123';
    const mockDate = new Date('2024-01-01');

    component.orderNumber = mockOrderNumber;
    component.orderDate = mockDate;
    fixture.detectChanges();

    expect(component.orderNumber).toBe(mockOrderNumber);
    expect(component.orderDate).toBe(mockDate);
  });

  it('should have a default orderDate set to today if not provided', () => {
    const now = new Date();
    component = new OrderHeader();
    expect(component.orderDate instanceof Date).toBeTrue();
    expect(Math.abs(component.orderDate.getTime() - now.getTime())).toBeLessThan(1000);
  });
});
