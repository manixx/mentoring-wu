import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {SessionService} from 'src/app/session.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  constructor(
    private readonly db: AngularFirestore,
    private readonly session: SessionService,
  ) { }

  ngOnInit() {
  }

}
