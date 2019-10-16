import { Component, OnInit, OnDestroy } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {SessionService} from 'src/app/session.service';
import {Goal, goalCollection} from 'src/app/goal/goal';
import {MatSnackBar, MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, Validators, FormControl} from '@angular/forms';
import {Setting, settingsDocument} from 'src/app/setting';
import {map, filter} from 'rxjs/operators';
import {DoneComponent} from 'src/app/done/done.component';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit, OnDestroy {

  constructor(
    private readonly db: AngularFirestore,
    private readonly session: SessionService,
    private readonly snackBar: MatSnackBar,
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog,
  ) { }

  suggestions: string[] = []
  charsUntilAutocompletion = 5
  dialogRef: MatDialogRef<DoneComponent>

  goals = this.db
    .collection<Goal>(
      goalCollection,
      ref => ref.where('session', '==', this.session.key)
    )
    .valueChanges({ idField: 'id' })

  settings = this.db
    .doc<Setting>(settingsDocument)

  newGoal = this.formBuilder
    .control('', [
      Validators.required,
    ])

  goalSuggestions = this.newGoal
    .valueChanges
    .pipe(
      map(v => {
        if(!v) return []
        if(v.length < this.charsUntilAutocompletion) return []

        return this.suggestions.filter(s => {
          return s.toLowerCase().includes(v.toLowerCase())
        })
      })
    )

  ngOnInit() {
    this.settings
      .valueChanges()
      .pipe(
        map(s => s.goalSuggestions)
      )
      .subscribe(suggestions => this.suggestions = suggestions)
  }

  ngOnDestroy() {
    if(this.dialogRef) {
      this.dialogRef.close()
    }
  }

  add() {
    this.newGoal.markAsTouched()
    if(!this.newGoal.valid) return

    this.db
      .collection<Goal>(goalCollection)
      .add({
        session: this.session.key,
        goal: this.newGoal.value,
        important: false
      })

    this.newGoal.reset()
  }

  delete(goal: Goal) {
    this.db
      .collection(goalCollection)
      .doc(goal.id)
      .delete()
    this.snackBar
      .open('Dein Ziel wurde gelöscht 🤭')
  }


  hasError(formControl: FormControl, errorCode: string) {
    return formControl.hasError(errorCode)
  }

  async setFavourite(goal: Goal, value: boolean) {

    const col = this.db.collection<Goal>(goalCollection)

    const handler = this.db
      .collection<Goal>(goalCollection, ref => ref.where('session', '==', this.session.key))
      .get()
      .subscribe(goals => {
        goals.forEach(g => g.ref.update({
          important: false
        }))
        col
          .doc(goal.id)
          .update({ important: value })
        handler.unsubscribe()
      })
  }

  done() {
    this.dialogRef = this.dialog.open(DoneComponent)
  }
}
