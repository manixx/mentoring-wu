import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-goal-form-control',
  templateUrl: './goal-form-control.component.html',
  styleUrls: ['./goal-form-control.component.css']
})
export class GoalFormControlComponent {

  @Input()
  appFormControl: FormControl

  @Input()
  placeholder: string

  @Input()
  submit: () => void

  hasError(errorCode: string) {
    if(!this.appFormControl.dirty)
      return false

    return this.appFormControl.hasError(errorCode)
  }

  change() {
    if(!this.submit) return
    this.submit()
  }

}
