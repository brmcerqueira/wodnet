import {Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormGroupDirective} from '@angular/forms';

export abstract class SpinnerComponent implements ControlValueAccessor, OnInit {

  private value: number;
  @Input() public min: number;
  @Input() public max?: number;
  @Input() public maxByControl?: string;
  public text: string;
  @Input() public isDisabled: boolean;
  private onChange: (value: number) => void;
  private onTouched: () => void;

  protected constructor(private parent: FormGroupDirective) {
    this.value = 0;
    this.text = null;
  }

  private get currentMax(): number {
    return this.maxByControl ? this.parent.form.controls[this.maxByControl].value : this.max;
  }

  public ngOnInit(): void {
    this.value = this.min;
    this.updateSubscribes();
    this.updateValue();
  }

  public abstract get fillMark(): string;

  public abstract get emptyMark(): string;

  private updateSubscribes(): void {
    if (this.maxByControl) {
      this.parent.form.controls[this.maxByControl].valueChanges.subscribe(m => {
        if (this.value > this.currentMax) {
          this.value = this.currentMax;
        }
        this.updateValue();
      });
    }
  }

  public updateText(): void {
      this.text = '';
      for (let i = 0; i < this.value; i++) {
        this.putMarker(this.fillMark, i == 5);
      }
      for (let i = this.value; i < this.currentMax; i++) {
        this.putMarker(this.emptyMark, i == 5);
      }
  }

  public putMarker(marker: string, putSpace: boolean): void {
    this.text += putSpace ? `<i class="ml-2 ${marker}"></i>` : `<i class="${marker}"></i>`;
  }

  public add(): void {
    if (this.value < this.currentMax) {
      this.value++;
      this.updateValue();
    }
  }

  private updateValue() {
    this.updateText();

    if (this.onChange) {
      this.onChange(this.value);
    }

    if (this.onTouched) {
      this.onTouched();
    }
  }

  public less(): void {
    if (this.value > this.min) {
      this.value--;
      this.updateValue();
    }
  }

  public writeValue(value: number): void {
    this.value = value;
    this.updateText();
    this.updateSubscribes();
  }

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
