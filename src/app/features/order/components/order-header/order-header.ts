import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-header.html',
  styleUrl: './order-header.scss',
})
export class OrderHeader implements OnInit {

  // TODO - IMPLEMENTAR DATEPICKER DO MATEIRAL PARA CORRIGIR CAMPO DATA
  // NÃO ACEITANDO DATAS FUTURAS
  @Input() orderNumber!: string;
  @Input() orderDate!: Date;

  public today = new Date().toISOString().split('T')[0];
  public dataControl = new FormControl();

  ngOnInit(): void {
    const dataInicial = this.orderDate ?? new Date();
    this.dataControl.setValue(dataInicial.toISOString().split('T')[0]);
  }
}