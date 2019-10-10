import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import {
  MatButtonModule,
  MatExpansionModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatDividerModule,
  MatAutocompleteModule
} from '@angular/material'

import firebaseConfig from '../environments/firebase';
import { AdminComponent } from './admin/admin.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { OrientationComponent } from './orientation/orientation.component';
import { AdminGoalsComponent } from './admin-goals/admin-goals.component';
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component';
import { DynamicComponentComponent } from './util/dynamic-component/dynamic-component.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { GoalFormControlComponent } from './form-controls/goal-form-control/goal-form-control.component';
import { AdminOrientationQuestionComponent } from './form-controls/admin-orientation-question/admin-orientation-question.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GoalComponent } from './goal/goal.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    FeedbackComponent,
    OrientationComponent,
    AdminGoalsComponent,
    AdminFeedbackComponent,
    DynamicComponentComponent,
    GoalFormControlComponent,
    AdminOrientationQuestionComponent,
    WelcomeComponent,
    GoalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    MatButtonModule,
    MatExpansionModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AdminGoalsComponent,
    AdminFeedbackComponent,
  ]
})
export class AppModule { }
