import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import {
  MatButtonModule,
  MatExpansionModule
} from '@angular/material'

import firebaseConfig from '../environments/firebase';
import { AdminComponent } from './admin/admin.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { OrientationComponent } from './orientation/orientation.component';
import { GoalComponent as AdminGoalComponent } from './admin/goal/goal.component';
import { OrientationComponent as AdminOrientationComponent } from './admin/orientation/orientation.component'
import { FeedbackComponent as AdminFeedbackComponent } from './admin/feedback/feedback.component'

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    FeedbackComponent,
    OrientationComponent,
    AdminGoalComponent,
    AdminOrientationComponent,
    AdminFeedbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MatButtonModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
