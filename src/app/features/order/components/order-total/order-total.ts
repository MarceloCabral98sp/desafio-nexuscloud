import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-order-total',
  imports: [CommonModule, MatCardModule],
  templateUrl: './order-total.html',
  styleUrl: './order-total.scss',
})
export class OrderTotal {
  @Input() total: number = 0;
}
