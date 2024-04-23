import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appKeyboardManagerItem]',
  standalone: true
})
export class KeyboardManagerItemDirective {

    @Output() public focused: EventEmitter<void> = new EventEmitter<void>();

    constructor(private elementRef: ElementRef<HTMLElement>) { }

    public focus(): void{
        this.elementRef.nativeElement.focus();
        this.focused.emit();
    }

    public isFocused(): boolean{
        return this.elementRef.nativeElement === document.activeElement;
    }
}
