import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Setting} from 'src/app/settings';
import {map, filter} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private readonly db: AngularFirestore,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.db.doc<Setting>('admin/settings')
      .valueChanges()
      .pipe(
        filter(s => !!s.openSection),
        map(s => s.openSection),
      )
      .subscribe(section => {
        this.router.navigateByUrl(section.url)
      })
  }

}
