import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestHost } from './test-host';

describe('QuantityMask Directive', () => {
  let fixture: ComponentFixture<TestHost>;
  let inputEl: HTMLInputElement;
  let component: TestHost;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    fixture.detectChanges();
  });

  it('should format input based on even codeControl value', () => {
    component.codeControl.setValue('2'); 
    inputEl.value = '123,45';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputEl.value).toBe('123');
    expect(component.quantity.value).toBe('123');
  });

  it('should format input with 3 decimal places for odd codeControl value', () => {
    component.codeControl.setValue('3'); 
    inputEl.value = '123,4567';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputEl.value).toBe('123,456');
    expect(component.quantity.value).toBe('123.456');
  });
});