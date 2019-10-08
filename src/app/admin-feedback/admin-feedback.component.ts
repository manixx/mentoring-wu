import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {FeedbackQuestion} from 'src/app/feedback-question';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.css']
})
export class AdminFeedbackComponent implements OnInit {

  constructor(
    private readonly db: AngularFirestore,
  ) { }

  feedbackQuestions = this.db.collection<FeedbackQuestion>('admin/settings/feedback-questions')

  ngOnInit() {
  }

}
