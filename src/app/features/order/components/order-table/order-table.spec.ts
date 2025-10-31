import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { OrderTable } from './order-table';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OrderItem } from '../../../../core/models/order-item.model';

describe('OrderTable', () => {
  let component: OrderTable;
  let fixture: ComponentFixture<OrderTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OrderTable,
        ReactiveFormsModule,
        CommonModule,
        CurrencyMaskModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with one empty item if no input provided', () => {
    expect(component.form).toBeDefined();
    expect(component.itemsFormArray.length).toBe(1);
  });

  it('should add a new item', () => {
    const initialLength = component.itemsFormArray.length;
    component.addItem();
    expect(component.itemsFormArray.length).toBe(initialLength + 1);
  });

  it('should remove an item', () => {
    component.addItem();
    const lengthBefore = component.itemsFormArray.length;
    component.removeItem(0);
    expect(component.itemsFormArray.length).toBe(lengthBefore - 1);
  });

  it('should recalculate total when quantity or unitPrice changes', fakeAsync(() => {
    const item = component.itemsFormArray.at(0);
    item.get('quantity')?.setValue(2);
    item.get('unitPrice')?.setValue(10);

    tick(200);

    expect(item.get('totalPrice')?.value).toBe(20);
  }));

  it('should emit orderItemsChange and totalItemsChange when updating total', fakeAsync(() => {
    const itemsSpy = jasmine.createSpy('itemsSpy');
    const totalSpy = jasmine.createSpy('totalSpy');

    component.orderItemsChange.subscribe(itemsSpy);
    component.totalItemsChange.subscribe(totalSpy);

    const item = component.itemsFormArray.at(0);
    item.get('quantity')?.setValue(3);
    item.get('unitPrice')?.setValue(15);

    tick(200); 

    expect(itemsSpy).toHaveBeenCalled();
    expect(totalSpy).toHaveBeenCalled();
  }));

  it('should generate 100 fake items', () => {
    component.generateFakeItems();
    expect(component.itemsFormArray.length).toBeGreaterThanOrEqual(100);
  });

  it('should block invalid keys', () => {
    const event = new KeyboardEvent('keydown', { key: 'e' });
    spyOn(event, 'preventDefault');
    component.blockInvalidKeys(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should correctly calculate unitPrice when totalPrice changes', fakeAsync(() => {
    const item = component.itemsFormArray.at(0);
    item.get('quantity')?.setValue(2);
    item.get('totalPrice')?.setValue(50);

    tick(200); 

    expect(item.get('unitPrice')?.value).toBe(25);
  }));

  it('should focus on currency input', () => {
    const input = document.createElement('input');
    input.value = '123.45';
    const event = { target: input } as unknown as FocusEvent;
    component.onFocusCurrency(event);
    expect(input.selectionStart).toBe(input.value.length);
    expect(input.selectionEnd).toBe(input.value.length);
  });

  it('should mark form invalid if item is incomplete on Enter', () => {
    const item = component.itemsFormArray.at(0);
    spyOn(item, 'markAllAsTouched');

    component.onEnterKey(0, new Event('keydown'));

    expect(item.markAllAsTouched).toHaveBeenCalled();
  });
});
