import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material';
import {SessionService} from 'src/app/session.service';
import {FeedbackQuestion} from 'src/app/feedback-question';
import {feedbackQuestionCollection} from 'src/app/feedback/feedback-question';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(
    private readonly db: AngularFirestore,
    private readonly session: SessionService,
    private readonly snackBar: MatSnackBar,
  ) { }

  questions = this.db.collection<FeedbackQuestion>(feedbackQuestionCollection)
    .valueChanges()

  ngOnInit() {
    this.questions.subscribe(what => console.log(what))
  }

  addQuestion(question: FeedbackQuestion, answer: string) {

  }

}
