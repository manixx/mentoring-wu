import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {SessionService} from 'src/app/session.service';
import {orientationQuestionCollection, OrientationQuestion} from 'src/app/orientation/orientation-question';
import {MatList, MatSelectionList, MatSnackBar, MatSelectionListChange, MatListOption, MatDialog, MatDialogRef} from '@angular/material';
import {OrientationAnswer, orientationAnswerCollection} from 'src/app/orientation/orientation-answer';
import {DoneComponent} from 'src/app/done/done.component';

interface ListOption {
  question: OrientationQuestion
  option: string
}

@Component({
  selector: 'app-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.css']
})
export class OrientationComponent implements AfterViewInit, OnDestroy {

  constructor(
    private readonly db: AngularFirestore,
    private readonly session: SessionService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) { }

  @ViewChildren(MatSelectionList)
  private readonly lists: QueryList<MatSelectionList>

  questions = this.db
    .collection<OrientationQuestion>(orientationQuestionCollection)
    .valueChanges()

  answersRef = this.db
      .collection<OrientationAnswer>(orientationAnswerCollection)
      .doc(this.session.key)

  dialogRef: MatDialogRef<DoneComponent>

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    if(this.dialogRef) {
      this.dialogRef.close()
    }
  }

  changeAnswer(event: MatSelectionListChange) {
    const { question } = event.option.value as ListOption

    if(event.source.selectedOptions.selected.length > question.minRequired) {
      this.snackBar.open(`Du kannst nur ${question.minRequired} auswählen. Ändere deine Auswahl.`, null, { duration: 1000 })
      event.option.selected = false
      return
    }

    const answers = this.lists.map(list => {
      const values = list.selectedOptions.selected

      return {
        question: list.options.first.value.question.question,
        options: values.map(o => o.value.option),
      }
    })

    this.answersRef.set({
      session: this.session.key,
      answers,
    })
  }

  done() {
    this.dialogRef = this.dialog.open(DoneComponent, { disableClose: false })
  }
}
