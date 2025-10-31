import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../core/models/order.model';
import { OrderService } from '../../../../core/services/order.service';
import { CommonModule } from '@angular/common';
import { OrderHeader } from '../../components/order-header/order-header';
import { OrderTable } from '../../components/order-table/order-table';
import { OrderTotal } from '../../components/order-total/order-total';
import { OrderItem } from '../../../../core/models/order-item.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-page',
  imports: [CommonModule, OrderHeader, OrderTable, OrderTotal, MatButtonModule],
  templateUrl: './order-page.html',
  styleUrl: './order-page.scss',
})
export class OrderPage implements OnInit {

  public order!: Order;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.order = this.orderService.createNewOrder();
  }

  public onOrdemItemsChange(items: OrderItem[]) {
    this.order.items = items;
  }

  public onTotalItemsChange(total: number) {
    this.order.total = total;
  }

  // TODO - Remover alert e resetar form e mostrar uma mensagem ao usuário
  public saveOrder() {
    this.orderService.saveOrder(this.order).subscribe({
      next: (res) => alert('Pedido salvo!'),
      error: (err) => console.error(err),
    });
  }
}
