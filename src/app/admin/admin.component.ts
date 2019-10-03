import { Component, OnInit } from '@angular/core';
import {GoalComponent} from 'src/app/admin/goal/goal.component';
import {OrientationComponent} from 'src/app/admin/orientation/orientation.component';
import {FeedbackComponent} from 'src/app/admin/feedback/feedback.component';

interface Section {
  title: string
  component: any // TODO change
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  sections: Section[] = [
    { title: 'Ziele', component: GoalComponent },
    { title: 'Orientierung', component: OrientationComponent },
    { title: 'Feedback', component: FeedbackComponent },
  ]

  ngOnInit() {
  }

}
