import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { YesNoButtonGroupComponent } from './shared/components/yes-no-button-group/yes-no-button-group.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisableControlDirective } from './shared/directives/disable-control/disable-control.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, YesNoButtonGroupComponent, ReactiveFormsModule, FormsModule, DisableControlDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title: string = 'cursoAcessibilidade';
  public form!: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.form = formBuilder.group({
      yesNoAnswer: [{
        value: 'no',
        disabled: null
      }]
    })
  }

  public submit(): void{
    console.log(this.form.value);
  }
}
