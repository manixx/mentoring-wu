import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {SessionService} from 'src/app/session.service';
import {Goal, goalCollection} from 'src/app/goal/goal';
import {MatSnackBar} from '@angular/material';
import {FormBuilder, Validators} from '@angular/forms';

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

  goals: Goal[]
  newGoal = this.formBuilder.control(null, [
    Validators.required,
    Validators.minLength(4),
  ])

  ngOnInit() {
    this.db.collection<Goal>(
      goalCollection,
      ref => ref.where('session', '==', this.session.key)
    )
      .valueChanges()
      .subscribe(g => this.goals = g)
  }

  add() {
    this.newGoal.markAsTouched()
    if(!this.newGoal.valid) return

    this.db.collection<Goal>(goalCollection).add({
      session: this.session.key,
      goal: this.newGoal.value,
      important: false
    })
  }

  delete(goal: Goal) {
    this.db.doc(`${goalCollection}/${goal.id}`).delete()
  }

  setFavourite() {

  }

}
