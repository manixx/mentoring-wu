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
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatTooltipModule,
  MatProgressBarModule
} from '@angular/material'

import firebaseConfig from '../environments/firebase';
import { FeedbackComponent } from './feedback/feedback.component';
import { OrientationComponent } from './orientation/orientation.component';
import { DynamicComponentComponent } from './admin/dynamic-component/dynamic-component.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { GoalFormControlComponent } from './form-controls/goal-form-control/goal-form-control.component';
import { AdminOrientationQuestionComponent } from './form-controls/admin-orientation-question/admin-orientation-question.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GoalComponent } from './goal/goal.component';
import { AdminComponent } from './admin/admin.component';
import { GoalComponent as AdminGoalComponent } from './admin/goal/goal.component'
import { OrientationComponent as AdminOrientationComponent } from './admin/orientation/orientation.component'
import { FeedbackComponent as AdminFeedbackComponent } from './admin/feedback/feedback.component'
import {AngularFireAuthModule} from '@angular/fire/auth';
import { WordcloudComponent } from './admin/wordcloud/wordcloud.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    OrientationComponent,
    DynamicComponentComponent,
    GoalFormControlComponent,
    AdminOrientationQuestionComponent,
    WelcomeComponent,
    GoalComponent,
    AdminComponent,
    AdminGoalComponent,
    AdminOrientationComponent,
    AdminFeedbackComponent,
    WordcloudComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
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
    MatSlideToggleModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AdminGoalComponent,
    AdminOrientationComponent,
    AdminFeedbackComponent,
  ]
})
export class AppModule { }
