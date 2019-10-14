import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from 'src/app/welcome/welcome.component';
import {GoalComponent} from 'src/app/goal/goal.component';
import {OrientationComponent} from 'src/app/orientation/orientation.component';
import {FeedbackComponent} from 'src/app/feedback/feedback.component';
import {AdminComponent} from 'src/app/admin/admin.component';
import {AdminGuard} from 'src/app/admin/admin.guard';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
  },
  { path: 'ziele', component: GoalComponent },
  { path: 'orientierung', component: OrientationComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: '', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
