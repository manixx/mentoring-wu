import { Component, OnInit, ComponentFactoryResolver, OnDestroy, Type } from '@angular/core';
import {AdminGoalsComponent} from 'src/app/admin-goals/admin-goals.component';
import {AdminOrientationComponent} from 'src/app/admin-orientation/admin-orientation.component';
import {AdminFeedbackComponent} from 'src/app/admin-feedback/admin-feedback.component';

interface Section {
  title: string
  component: Type<unknown>
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  constructor() { }

  sections: Section[] = [
    { title: 'Ziele',        component: AdminGoalsComponent },
    { title: 'Orientierung', component: AdminOrientationComponent },
    { title: 'Feedback',     component: AdminFeedbackComponent },
  ]

  ngOnInit() {
  }

  ngOnDestroy() {

  }

}
