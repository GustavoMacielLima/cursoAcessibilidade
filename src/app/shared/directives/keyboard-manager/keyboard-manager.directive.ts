import { ContentChildren, Directive, HostListener, QueryList } from '@angular/core';
import { KeyboardManagerItemDirective } from './keyboard-manager-item.directive';

@Directive({
  selector: '[appKeyboardManager]',
  standalone: true
})
export class KeyboardManagerDirective {

  constructor() { }

  @ContentChildren(KeyboardManagerItemDirective) public itens!: QueryList<KeyboardManagerItemDirective>;

  @HostListener('keyup', ['$event'])
  public managerKeys(event: KeyboardEvent): void{
    switch(event.key){
      case 'ArrowLeft':
      case 'ArrowDown':
        this.moveFocus(ArrowDirection.LEFT).focus();
        break
      case 'ArrowRight':
      case 'ArrowUp':
          this.moveFocus(ArrowDirection.RIGHT).focus();
        break
    }
  }

  public moveFocus(direction: ArrowDirection): KeyboardManagerItemDirective{
    const itens = this.itens.toArray();
    const currentFocus: number = itens.findIndex((item: KeyboardManagerItemDirective) => item.isFocused());
    const targetElementFocus: KeyboardManagerItemDirective = itens[currentFocus + direction];

    return targetElementFocus ? targetElementFocus : itens[currentFocus];
  }
}


enum ArrowDirection {
  LEFT = -1,
  RIGHT = 1
}