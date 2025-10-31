import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-total',
  imports: [CommonModule],
  templateUrl: './order-total.html',
  styleUrl: './order-total.scss',
})
export class OrderTotal {
  @Input() total: number = 0;
}
