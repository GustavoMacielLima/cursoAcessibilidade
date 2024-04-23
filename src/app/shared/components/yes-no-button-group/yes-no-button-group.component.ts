import { Component, EventEmitter, Input, Output, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as uuid from 'uuid';
import { UniqueIdService } from '../../services/unique-id/unique-id.service';
import { KeyboardManagerDirective } from '../../directives/keyboard-manager/keyboard-manager.directive';
import { KeyboardManagerItemDirective } from '../../directives/keyboard-manager/keyboard-manager-item.directive';

@Component({
  selector: 'app-yes-no-button-group',
  standalone: true,
  imports: [KeyboardManagerDirective, KeyboardManagerItemDirective],
  templateUrl: './yes-no-button-group.component.html',
  styleUrl: './yes-no-button-group.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => YesNoButtonGroupComponent)
    },
    UniqueIdService
  ]
})
export class YesNoButtonGroupComponent implements ControlValueAccessor {
  @Input() public value!: string;
  @Input() public label!: string;
  @Input() public disabled: boolean = false;
  @Output() public valueChange: EventEmitter<string> = new EventEmitter<string>();

  public options: any = YesNoButtonGroupButton;
  public componentId!: string;

  public onChange: (value: string) => void = (value: string) => {};
  public onTouched: () => void = () => {};

  public constructor(private uniqueIdService: UniqueIdService){
    this.componentId = uniqueIdService.generateUniqueIdWithPrefix('yes-no-button-group');
  }

  public writeValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public activate(value: string) {
    this.writeValue(value);
  }
}

enum YesNoButtonGroupButton{
  YES = 'yes',
  NO = 'no'
}