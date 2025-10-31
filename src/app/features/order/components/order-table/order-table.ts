import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { OrderItem } from '../../../../core/models/order-item.model';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { QuantityMask } from '../../../../core/directives/quantity-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-order-table',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CurrencyMaskModule,
    QuantityMask,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './order-table.html',
  styleUrl: './order-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTable implements OnInit {
  public form!: FormGroup;

  @Input() orderItems: OrderItem[] = [];
  @Output() orderItemsChange = new EventEmitter<OrderItem[]>();
  @Output() totalItemsChange = new EventEmitter<number>();

  @ViewChildren('rowInput') rowInputs!: QueryList<ElementRef<HTMLInputElement>>;

  public currencyOptions = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    align: 'left',
    allowNegative: false,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.populateInitialItems();
  }

  private initializeForm() {
    this.form = this.fb.group({
      items: this.fb.array([]),
    });
  }

  private populateInitialItems() {
    if (this.orderItems.length) {
      this.orderItems.forEach((item) => this.addItem(item));
    } else {
      this.addItem();
    }
  }

  get itemsFormArray(): FormArray {
    return this.form.get('items') as FormArray;
  }

  public addItem(item?: OrderItem) {
    const group = this.createItemGroup(item);
    this.subscribeToValueChanges(group);
    this.itemsFormArray.push(group);
    this.updateTotal();
  }

  public createItemGroup(item?: OrderItem): FormGroup {
    return this.fb.group({
      code: [item?.code || null, [Validators.required, Validators.min(0)]],
      description: [
        item?.description || '',
        [Validators.required, Validators.maxLength(100)],
      ],
      quantity: [
        item?.quantity || null,
        [Validators.required, Validators.min(0.001)],
      ],
      unitPrice: [
        item?.unitPrice || 0,
        [Validators.required, Validators.min(0.01)],
      ],
      totalPrice: [
        item?.totalPrice || 0,
        [Validators.required, Validators.min(0.01)],
      ],
    });
  }

  public subscribeToValueChanges(group: FormGroup) {
    ['quantity', 'unitPrice', 'totalPrice'].forEach((field) => {
      group
        .get(field)
        ?.valueChanges.pipe(debounceTime(150)) // ajustável conforme sua necessidade
        .subscribe(() => {
          this.recalculatePrices(
            group,
            field as 'quantity' | 'unitPrice' | 'totalPrice'
          );
        });
    });
  }

  public removeItem(index: number) {
    this.itemsFormArray.removeAt(index);
    this.updateTotal();
  }

  public updateTotal() {
    const total = parseFloat(
      this.itemsFormArray.controls
        .reduce((sum, group) => {
          const quantity = Number(group.get('quantity')?.value) || 0;
          const unitPrice = Number(group.get('unitPrice')?.value) || 0;
          return sum + quantity * unitPrice;
        }, 0)
        .toFixed(2)
    );

    this.orderItemsChange.emit(
      this.itemsFormArray.getRawValue() as OrderItem[]
    );
    this.totalItemsChange.emit(total);
  }

  public recalculatePrices(
    group: FormGroup,
    source: 'quantity' | 'unitPrice' | 'totalPrice'
  ) {
    const quantity = Number(group.get('quantity')?.value) || 0;
    const unitPrice = Number(group.get('unitPrice')?.value) || 0;
    const totalPrice = Number(group.get('totalPrice')?.value) || 0;

    switch (source) {
      case 'unitPrice':
      case 'quantity':
        if (quantity > 0 && unitPrice > 0) {
          group
            .get('totalPrice')
            ?.setValue(parseFloat((quantity * unitPrice).toFixed(2)), {
              emitEvent: false,
            });
        }
        break;

      case 'totalPrice':
        if (quantity > 0) {
          group
            .get('unitPrice')
            ?.setValue(parseFloat((totalPrice / quantity).toFixed(2)), {
              emitEvent: false,
            });
        }
        break;
    }

    this.updateTotal();
  }

  public onEnterKey(index: number, event: Event) {
    event.preventDefault();
    const itemGroup = this.itemsFormArray.at(index);

    if (itemGroup.valid) {
      this.addItem();
      setTimeout(() => {
        const lastInput = this.rowInputs.last;
        if (lastInput) lastInput.nativeElement.focus();
      }, 0);
    } else {
      itemGroup.markAllAsTouched();
    }
  }

  get isFormValid(): boolean {
    return this.form.valid && this.itemsFormArray.length > 0;
  }

  public generateFakeItems() {
    for (let i = 0; i < 600; i++) {
      const quantity = +(Math.random() * 10 + 1).toFixed(3);
      const unitPrice = +(Math.random() * 100).toFixed(2);
      const totalPrice = +(quantity * unitPrice).toFixed(2);

      const fakeItem: OrderItem = {
        code: `${1000 + i}`,
        description: `Produto ${i + 1}`,
        quantity,
        unitPrice,
        totalPrice,
      };

      this.addItem(fakeItem);
    }

    this.updateTotal();
  }

  public blockInvalidKeys(event: KeyboardEvent) {
    const invalidKeys = ['e', 'E', '+', '-', '.'];
    if (invalidKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  public preventNegativeValue(control: AbstractControl, event: Event) {
    const input = event.target as HTMLInputElement;
    let value = Number(input.value);

    if (value < 0) {
      value = 0;
      input.value = '0';
      (control as FormGroup).get('code')?.setValue(0);
    }
  }

  public onFocusCurrency(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    input.setSelectionRange(input.value.length, input.value.length);
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
