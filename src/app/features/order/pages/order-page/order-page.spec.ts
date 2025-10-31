import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderPage } from './order-page';
import { OrderService } from '../../../../core/services/order.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { OrderHeader } from '../../components/order-header/order-header';
import { OrderTable } from '../../components/order-table/order-table';
import { OrderTotal } from '../../components/order-total/order-total';
import { CommonModule, registerLocaleData } from '@angular/common';
import { OrderItem } from '../../../../core/models/order-item.model';
import localePt from '@angular/common/locales/pt';

describe('OrderPage', () => {
  let component: OrderPage;
  let fixture: ComponentFixture<OrderPage>;
  let orderService: OrderService;
  let spySave: jasmine.Spy;

  beforeEach(async () => {
    registerLocaleData(localePt);

    await TestBed.configureTestingModule({
      imports: [
        OrderPage,
        CommonModule,
        OrderHeader,
        OrderTable,
        OrderTotal,
        MatSnackBarModule,
        HttpClientTestingModule,
      ],
      providers: [OrderService],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderPage);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);

    spySave = spyOn(orderService, 'saveOrder').and.callFake((order) => of(order));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize a new order on ngOnInit', () => {
    component.ngOnInit();
    expect(component.order).toBeTruthy();
    expect(component.order.items).toEqual([]);
    expect(component.order.total).toBe(0);
  });

  it('should update items and total', () => {
    const itemsMock: OrderItem[] = [
      {
        code: 'P001',
        description: 'Produto de teste',
        quantity: 2,
        unitPrice: 10,
        totalPrice: 20,
      },
    ];

    component.onOrdemItemsChange(itemsMock);
    expect(component.order.items).toEqual(itemsMock);

    component.onTotalItemsChange(100);
    expect(component.order.total).toBe(100);
  });

  it('should call saveOrder and show snackbar', () => {
    const spySnack = spyOn(component['snackBar'], 'open');

    component.order = orderService.createNewOrder();
    component.saveOrder();

    expect(spySave).toHaveBeenCalledWith(
      jasmine.objectContaining({
        total: 0,
        items: jasmine.any(Array),
      })
    );

    expect(spySnack).toHaveBeenCalledWith(
      'Pedido salvo com sucesso!',
      'Fechar',
      jasmine.any(Object)
    );
  });
});
