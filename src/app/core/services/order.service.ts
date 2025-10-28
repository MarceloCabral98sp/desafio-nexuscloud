import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  public generateOrderNumber(): string {
    const letters = Array.from({ length: 3 }, () => 
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join('');
    const numbers = Math.floor(100 + Math.random() * 900);

    return `${letters}${numbers}`;
  }

  public saveOrder(order: Order) {
    console.log('Pedido salvo: ', order);
  }

  calculateTotal(items: {totalPrice: number}[]): number {
    return  items.reduce((acc, i) => acc + i.totalPrice, 0);
  }
}
