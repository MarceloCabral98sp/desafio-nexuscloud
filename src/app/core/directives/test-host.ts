import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { QuantityMask } from './quantity-mask'; // ajuste o caminho conforme necessário

@Component({
  selector: 'app-test-host',
  template: `
    <input [formControl]="quantity" [appQuantityMask]="codeControl" />
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuantityMask],
})
export class TestHost {
  quantity = new FormControl('');
  codeControl = new FormControl('');
}