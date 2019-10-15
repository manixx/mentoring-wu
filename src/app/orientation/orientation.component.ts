import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {SessionService} from 'src/app/session.service';
import {orientationQuestionCollection, OrientationQuestion} from 'src/app/orientation/orientation-question';
import {MatList, MatSelectionList, MatSnackBar, MatSelectionListChange, MatListOption} from '@angular/material';
import {OrientationAnswer, orientationAnswerCollection} from 'src/app/orientation/orientation-answer';
import firebase from 'firebase/app'

interface ListOption {
  question: OrientationQuestion
  option: string
}

@Component({
  selector: 'app-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.css']
})
export class OrientationComponent implements OnInit, AfterViewInit {

  constructor(
    private readonly db: AngularFirestore,
    private readonly session: SessionService,
    private readonly snackBar: MatSnackBar,
  ) { }

  @ViewChildren(MatSelectionList)
  private readonly lists: QueryList<MatSelectionList>

  questions = this.db.collection<OrientationQuestion>(orientationQuestionCollection)
    .valueChanges({ idField: 'id' })

  ngOnInit() {
    this.questions.subscribe(what => console.log(what))
  }

  ngAfterViewInit() {
    this.lists.changes
      .subscribe(() => {
        console.log(this.lists)
      })
  }

  changeAnswer(event: MatSelectionListChange) {
    const { question, option } = event.option.value as ListOption

    if(event.source.selectedOptions.selected.length > question.minRequired) {
      this.snackBar.open(`Du kannst nur ${question.minRequired} auswählen. Ändere deine Auswahl.`)
      event.option.selected = false
      return
    }

    this.db.collection<OrientationAnswer>(orientationAnswerCollection)
      .add({
        question: question.question,
        session: this.session.key,
        answers: this.toggleOption(event.option, option)
      })
  }

  toggleOption(matOption: MatListOption, option: string) {
    if(matOption.selected) {
      return firebase.firestore.FieldValue.arrayUnion(option)
    }
    else {
      return firebase.firestore.FieldValue.arrayRemove(option)
    }
  }
}
