import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../../../core/models/order.model';
import { OrderService } from '../../../../core/services/order.service';
import { CommonModule } from '@angular/common';
import { OrderHeader } from '../../components/order-header/order-header';
import { OrderTable } from '../../components/order-table/order-table';
import { OrderTotal } from '../../components/order-total/order-total';
import { OrderItem } from '../../../../core/models/order-item.model';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-page',
  imports: [CommonModule, OrderHeader, OrderTable, OrderTotal, MatButtonModule, MatSnackBarModule],
  templateUrl: './order-page.html',
  styleUrl: './order-page.scss',
})
export class OrderPage implements OnInit {
  public order!: Order;

  @ViewChild('orderTable') orderTable!: OrderTable;

  constructor(private orderService: OrderService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.order = this.orderService.createNewOrder();
  }

  public onOrdemItemsChange(items: OrderItem[]) {
    this.order.items = items;
  }

  public onTotalItemsChange(total: number) {
    this.order.total = total;
  }

  public saveOrder() {
  this.orderService.saveOrder(this.order).subscribe({
    next: (res) => {
      this.snackBar.open('Pedido salvo com sucesso!', 'Fechar', {
        duration: 3000, // 3 segundos
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      this.resetForm();
    },
    error: (err) => {
      this.snackBar.open('Erro ao salvar o pedido.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      console.error(err);
    },
  });
}

  private resetForm() {
    this.order = this.orderService.createNewOrder();

    this.orderTable.form.reset();
    this.orderTable.itemsFormArray.clear();

    this.orderTable.addItem();
  }
}
