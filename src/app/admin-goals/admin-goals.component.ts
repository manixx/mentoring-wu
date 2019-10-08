import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, filter } from 'rxjs/operators'
import {Setting} from 'src/app/settings';
import { FormBuilder, Validators, FormControl} from '@angular/forms';
import firebase from 'firebase/app'
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-admin-goals',
  templateUrl: './admin-goals.component.html',
  styleUrls: ['./admin-goals.component.css']
})
export class AdminGoalsComponent implements OnInit {

  constructor(
    private readonly db: AngularFirestore,
    private readonly builder: FormBuilder,
    private readonly snackBar: MatSnackBar,
  ) { }

  settings = this.db.doc<Setting>('admin/settings')

  suggestions = this.builder.array([])
  newSuggestion = this.createFormControl()

  fieldValue = firebase.firestore.FieldValue
  arrayUnion = this.fieldValue.arrayUnion
  arrayRemove = this.fieldValue.arrayRemove

  get updateHandler() {
    return this.update.bind(this)
  }

  ngOnInit() {
    this.settings
      .valueChanges()
      .pipe(map(s => s.suggestions))
      .subscribe(suggestions => {
        this.suggestions.clear()
        suggestions.forEach(s => this.suggestions.push(
          this.createFormControl(s)
        ))
      })
  }

  add(suggestion: FormControl) {
    this.suggestions.markAsTouched()
    if(!suggestion.valid) return

    this.settings.update({
      suggestions: this.arrayUnion(suggestion.value) as unknown as string[]
    })
    suggestion.reset()
  }

  update() {
    this.suggestions.markAsTouched({ onlySelf: false })
    if(!this.suggestions.valid) return

    this.settings.update({
      suggestions: this.suggestions.value,
    })

    this.snackBar.open('Liste aktualisiert')
    this.suggestions.markAsPristine({ onlySelf: false })
  }

  delete(suggestion: FormControl) {
    this.settings.update({
      suggestions: this.arrayRemove(suggestion.value) as unknown as string []
    })
    this.snackBar.open('Eintrag gelöscht')
  }

  reset(formControl: FormControl) {
    formControl.reset()
    formControl.markAsPristine()
    console.log(formControl)
  }

  private createFormControl(value?: string) {
    return this.builder.control(value, [
      Validators.required,
      Validators.minLength(4),
    ])
  }
}
