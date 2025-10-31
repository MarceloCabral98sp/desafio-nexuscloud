import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { Order } from '../models/order.model';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [OrderService],
    });

    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a valid order number', () => {
    const orderNumber = service.generateOrderNumber();
    expect(orderNumber).toMatch(/^[A-Z]{3}\d{3}$/);
  });

  it('should create a new order object', () => {
    const order = service.createNewOrder();
    expect(order).toEqual(
      jasmine.objectContaining({
        orderNumber: jasmine.any(String),
        orderDate: jasmine.any(Date),
        items: [],
        total: 0,
      })
    );
  });

  it('should save an order via HttpClient', () => {
    const mockOrder: Order = service.createNewOrder();

    service.saveOrder(mockOrder).subscribe((res) => {
      expect(res).toEqual(mockOrder);
    });

    const req = httpMock.expectOne('http://localhost:3000/orders');
    expect(req.request.method).toBe('POST');
    req.flush(mockOrder); 
  });
});
