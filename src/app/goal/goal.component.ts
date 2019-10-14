import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {SessionService} from 'src/app/session.service';
import {Goal, goalCollection} from 'src/app/goal/goal';
import {MatSnackBar} from '@angular/material';
import {FormBuilder, Validators, FormControl} from '@angular/forms';
import {Setting, settingsDocument} from 'src/app/setting';
import {map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  constructor(
    private readonly db: AngularFirestore,
    private readonly session: SessionService,
    private readonly snackBar: MatSnackBar,
    private readonly formBuilder: FormBuilder,
  ) { }

  goals = this.db.collection<Goal>(
      goalCollection,
      ref => ref.where('session', '==', this.session.key)
    )
      .valueChanges({ idField: 'id' })

  settings = this.db.doc<Setting>(settingsDocument)

  newGoal = this.formBuilder.control('', [
    Validators.required,
    Validators.minLength(4),
  ])

  suggestions: string[] = []

  goalSuggestions = this.newGoal
    .valueChanges
    .pipe(
      filter(v => typeof v === 'string'),
      filter(v => v.length > this.charsUntilAutocompletion),
      map(v => {
        return this.suggestions.filter(s => {
          return s.toLowerCase().includes(v.toLowerCase())
        })
      })
    )

  charsUntilAutocompletion = 4

  ngOnInit() {
    this.settings
      .valueChanges()
      .pipe(
        map(s => s.goalSuggestions)
      )
      .subscribe(suggestions => this.suggestions = suggestions)
  }

  add() {
    this.newGoal.markAsTouched()
    if(!this.newGoal.valid) return

    this.db.collection<Goal>(goalCollection).add({
      session: this.session.key,
      goal: this.newGoal.value,
      important: false
    })
    this.newGoal.reset()
  }

  delete(goal: Goal) {
    console.log(goal)
    this.db.doc(`${goalCollection}/${goal.id}`).delete()
    this.snackBar.open("Ziel gelöscht")
  }


  hasError(formControl: FormControl, errorCode: string) {
    return formControl.hasError(errorCode)
  }

  setFavourite(goal: Goal) {
    console.log(goal)
  }

}
