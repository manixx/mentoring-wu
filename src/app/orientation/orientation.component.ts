import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {SessionService} from 'src/app/session.service';
import {orientationQuestionCollection, OrientationQuestion} from 'src/app/orientation/orientation-question';

@Component({
  selector: 'app-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.css']
})
export class OrientationComponent implements OnInit {

  constructor(
    private readonly db: AngularFirestore,
    private readonly session: SessionService,
  ) { }

  questions = this.db.collection<OrientationQuestion>(orientationQuestionCollection)
    .valueChanges({ idField: 'id' })

  ngOnInit() {
    this.questions.subscribe(what => console.log(what))
  }

  changeAnswer(question: OrientationQuestion, option: string) {
    console.log('change', question, option)
  }
}
