import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Setting, settingsDocument} from 'src/app/setting';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly db: AngularFirestore,
  ) {}

  ngOnInit() {
    this.db.doc<Setting>(settingsDocument)
    .valueChanges()
    .subscribe(settings => {
      // skip admin access
      if(window.location.pathname == '/admin') {
        return
      }

      if(settings.openSection) {
        this.router.navigate([settings.openSection.url])
        return
      }

      this.router.navigate([''])
    })
  }
}
