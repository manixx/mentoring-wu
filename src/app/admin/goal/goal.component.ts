import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Setting, settingsDocument} from 'src/app/setting';
import {map} from 'rxjs/operators';
import {FormBuilder, Validators, FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import firebase from 'firebase/app'

@Component({
  selector: 'app-admin-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  constructor(
    private readonly db: AngularFirestore,
    private readonly fb: FormBuilder,
    private readonly sb: MatSnackBar,
  ) { }

  settings = this.db.doc<Setting>(settingsDocument)
  newSuggestion = this.createFormControl(null)
  suggestions = this.fb.array([this.newSuggestion])

  ngOnInit() {
    this.settings
      .valueChanges()
      .pipe(
        map(s => s.goalSuggestions),
      )
      .subscribe(suggestions => {
        this.suggestions.clear()
        suggestions.forEach(s => this.suggestions.push(this.createFormControl(s)))
        this.suggestions.push(this.newSuggestion)
      })

  }

  private create() {
    this.settings.update({
      goalSuggestions: firebase.firestore.FieldValue.arrayUnion(this.newSuggestion.value) as unknown as string[]
    })
    this.newSuggestion.reset()
  }

  update(suggestion: FormControl) {
    if(suggestion === this.newSuggestion) {
      this.create()
      return
    }

    const values = this.suggestions.value as string[]

    values.splice(values.length - 1, 1)

    this.settings.update({
      goalSuggestions: values
    })
  }

  delete(suggestion: FormControl) {
    this.settings.update({
      goalSuggestions: firebase.firestore.FieldValue.arrayRemove(suggestion.value) as unknown as string[]
    })
  }

  private createFormControl(value: string) {
    return this.fb.control(value, [
      Validators.required,
      Validators.minLength(4),
    ])
  }
}
