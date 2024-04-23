import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisableControl]',
  standalone: true
})
export class DisableControlDirective implements OnChanges{

  @Input() appDisableControl: boolean = false;

  constructor(private ngControl: NgControl) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['appDisableControl']){
      const action = this.appDisableControl ? 'disable' : 'enable';
      if(this.ngControl && this.ngControl.control)
        this.ngControl.control[action]();
    }
  }

}
