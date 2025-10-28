import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../core/models/order.model';
import { OrderService } from '../../../../core/services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-page',
  imports: [CommonModule],
  templateUrl: './order-page.html',
  styleUrl: './order-page.scss',
})
export class OrderPage implements OnInit {
  public order!: Order;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.order = {
      orderNumber: this.orderService.generateOrderNumber(),
      orderDate: new Date(),
      items: [],
      total: 0
    }

    console.log(this.order);
  }

  onSave() {
    this.orderService.saveOrder(this.order);
  }
}
