import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, Validators, FormControl} from '@angular/forms';
import {settingsDocument, Setting} from 'src/app/setting';
import {map} from 'rxjs/operators';
import firebase from 'firebase/app'

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(
    private readonly db: AngularFirestore,
    private readonly fb: FormBuilder,
  ) { }

  settings = this.db.doc<Setting>(settingsDocument)
  newQuestion = this.createFormControl(null)
  questions = this.fb.array([this.newQuestion])

  ngOnInit() {
    this.settings
      .valueChanges()
      .pipe(
        map(s => s.feedbackQuestions)
      )
      .subscribe(questions => {
        this.questions.clear()
        questions.forEach(q => this.questions.push(this.createFormControl(q)))
        this.questions.push(this.newQuestion)
      })
  }

  update(question: FormControl) {
    if(question === this.newQuestion) {
      this.create(question.value)
      question.reset()
      return;
    }

    const values: string[] = this.questions.value

    // remove last item, its the new input
    values.splice(values.length - 1, 1)

    this.settings.update({
      feedbackQuestions: values,
    })
  }

  delete(question: FormControl) {
    this.settings.update({
      feedbackQuestions: firebase.firestore.FieldValue.arrayRemove(question.value) as unknown as string []
    })
  }

  private create(value: string) {
    this.settings.update({
      feedbackQuestions: firebase.firestore.FieldValue.arrayUnion(value) as unknown as string []
    })
  }

  private createFormControl(value: string) {
    return this.fb.control(value, [
      Validators.required
    ])
  }

}
