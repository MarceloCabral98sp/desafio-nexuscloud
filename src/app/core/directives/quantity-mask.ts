import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appQuantityMask]',
})
export class QuantityMask implements OnInit, OnDestroy {
  
  @Input('appQuantityMask') codeControl?: any; 
  private sub?: Subscription;

  constructor(private el: ElementRef, private control: NgControl) {}

  ngOnInit() {
    if (this.codeControl?.valueChanges) {
      this.sub = this.codeControl.valueChanges.subscribe(() => {
        this.applyMask();
      });
    }
    this.applyMask();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  @HostListener('input')
  onInput() {
    this.applyMask();
  }

  private applyMask() {
    const input = this.el.nativeElement as HTMLInputElement;

    let rawValue = input.value.replace(',', '.').replace(/[^0-9.]/g, '');
    const parts = rawValue.split('.');
    if (parts.length > 2) rawValue = parts[0] + '.' + parts.slice(1).join('');

    const codeValue = this.codeControl?.value;
    const codeNum = parseInt(codeValue, 10);
    const isEven = !isNaN(codeNum) && codeNum % 2 === 0;

    let formattedValue = rawValue;

    if (isEven) {
      formattedValue = parts[0];
    } else if (!isEven && parts.length === 2) {
      parts[1] = parts[1].slice(0, 3);
      formattedValue = parts[0] + '.' + parts[1];
    }

    this.control.control?.setValue(formattedValue, { emitEvent: false });

    input.value = formattedValue.replace('.', ',');
  }
}
