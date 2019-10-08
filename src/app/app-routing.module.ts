import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from 'src/app/admin/admin.component';
import {WelcomeComponent} from 'src/app/welcome/welcome.component';
import {GoalComponent} from 'src/app/goal/goal.component';


const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'goals', component: GoalComponent },
  { path: '', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
