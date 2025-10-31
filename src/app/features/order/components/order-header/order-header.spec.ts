import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHeader } from './order-header';

describe('OrderHeader', () => {
  let component: OrderHeader;
  let fixture: ComponentFixture<OrderHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
