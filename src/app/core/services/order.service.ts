import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  public generateOrderNumber(): string {
    const letters = Array.from({ length: 3 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join('');
    const numbers = Math.floor(100 + Math.random() * 900);

    return `${letters}${numbers}`;
  }

  public createNewOrder(): Order {
    return {
      orderNumber: this.generateOrderNumber(),
      orderDate: new Date(),
      items: [],
      total: 0,
    };
  }

  public saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order);
  }
}
