import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {orientationQuestionCollection, OrientationQuestion} from 'src/app/orientation/orientation-question';
import {FormBuilder, Validators, FormGroup, FormArray, FormControl} from '@angular/forms';
import firebase from 'firebase/app'
import {OrientationAnswer, orientationAnswerCollection} from 'src/app/orientation/orientation-answer';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-admin-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.css']
})
export class OrientationComponent implements OnInit {

  constructor(
    private readonly db: AngularFirestore,
    private readonly fb: FormBuilder,
  ) { }

  collectionRef = this.db.collection<OrientationQuestion>(orientationQuestionCollection)
  newQuestion = this.createForm({ question: null, options: [], minRequired: 0 })
  questions = this.fb.array([this.newQuestion])

  answers = this.db.collection<OrientationAnswer>(orientationAnswerCollection)
    .valueChanges()
    .pipe(
      map(answers => {
        const questions = new Map<string, Map<string, number>>()

        for (const answer of answers) {
          if(!questions.has(answer.question)) {
            questions.set(answer.question, new Map<string, number>())
          }

          const answerMap = questions.get(answer.question)

          for (const option of answer.answers) {
            if(!answerMap.has(option)) {
              answerMap.set(option, 1)
            }
            else {
              answerMap.set(option, answerMap.get(option) + 1)
            }
          }
        }

        console.log(questions)
        return questions
      })
    )

  ngOnInit() {
    this.collectionRef
      .valueChanges({ idField: 'id' })
      .subscribe(questions => {
        this.questions.clear()
        questions.forEach(q => this.questions.push(this.createForm(q)))
        this.questions.push(this.newQuestion)
      })
  }

  getOptions(question: FormGroup) {
    return question.get('options') as FormArray
  }

  update(question: FormGroup) {
    if(question === this.newQuestion) {
      this.create()
      return
    }

    const options = question.get('options').value as string[]
    options.splice(options.length - 1,1)
    this.collectionRef.doc<OrientationQuestion>(question.value.id).update({
      question: question.value.question,
      minRequired: question.value.minRequired,
      options,
    })
  }

  delete(question: FormControl) {
    this.collectionRef.doc(question.value.id).delete()
  }

  deleteOption(question: FormGroup, option: FormControl) {
    const options = question.get('options') as FormArray
    options.removeAt(options.controls.indexOf(options))
  }

  getNewOption(question: FormControl) {
    const options = question.get('options') as FormArray
    return options.controls[options.length - 1]
  }

  private create() {
    const options = this.newQuestion.get('options') as FormArray
    options.controls.splice(options.length - 1, 1)

    this.collectionRef.add(this.newQuestion.value)
    this.newQuestion.reset()

    options.clear()
    options.push(this.fb.control(null))
  }

  private createForm(question: OrientationQuestion) {
    const options = this.fb.array([...question.options, null])

    const form = this.fb.group({
      id: question.id,
      question: this.fb.control(question.question, [
        Validators.required
      ]),
      minRequired: this.fb.control(question.minRequired, [
        Validators.required
      ]),
      options,
    })

    this.addOptionHandler(options)

    return form
  }

  private addOptionHandler(options: FormArray) {
    const handler = options.controls[options.controls.length -1]
      .valueChanges
      .subscribe(() => {
        options.push(this.fb.control(null))
        handler.unsubscribe()
        this.addOptionHandler(options)
      })
  }
}
