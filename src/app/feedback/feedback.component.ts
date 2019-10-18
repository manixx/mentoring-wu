import { Component, OnInit, OnDestroy } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatSnackBar, MatDialog, MatDialogRef} from '@angular/material';
import {SessionService} from 'src/app/session.service';
import {FeedbackQuestion} from 'src/app/feedback-question';
import {feedbackQuestionCollection} from 'src/app/feedback/feedback-question';
import {settingsDocument, Setting} from 'src/app/setting';
import {Settings} from 'http2';
import {map} from 'rxjs/operators';
import {FormBuilder} from '@angular/forms';
import {FeedbackAnswer} from 'src/app/feedback-answer';
import {feedbackAnswerCollection} from 'src/app/feedback/feedback-answer';
import {DoneComponent} from 'src/app/done/done.component';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnDestroy {

  constructor(
    private readonly db: AngularFirestore,
    private readonly session: SessionService,
    private readonly snackBar: MatSnackBar,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
  ) { }

  forms = this.fb.array([]);

  dialogRef: MatDialogRef<DoneComponent>;

  ngOnInit() {
    this.db.doc<Setting>(settingsDocument)
      .valueChanges()
      .pipe(
        map(s => s.feedbackQuestions)
      )
      .subscribe(questions => {
        this.forms.clear();

        questions.forEach(q => this.forms.push(this.fb.group({
          question: q,
          answer: this.fb.control(null),
        })));
      });
  }

  ngOnDestroy() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  update() {
    const values = this.forms.value;

    this.db.collection<FeedbackAnswer>(feedbackAnswerCollection)
      .doc(this.session.key)
      .set({
        session: this.session.key,
        answers: values,
      });
  }

  done() {
    this.dialogRef = this.dialog.open(DoneComponent, { disableClose: false });
  }

}
