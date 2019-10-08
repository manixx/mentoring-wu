import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid'
import {AngularFirestore} from '@angular/fire/firestore';
import {filter} from 'rxjs/operators';
import {Setting} from 'src/app/settings';
import {Document} from 'src/app/db.enum';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly identifier = 'session'

  session: string

  constructor(
    private readonly db: AngularFirestore,
  ) {
    this.initialize()

    this.db.doc<Setting>('admin/settings')
      .valueChanges()
      .pipe(filter(s => !!s.refreshSessions))
      .subscribe(() => {
        console.log('refresh session')
        window.localStorage.clear()
        this.initialize()
      })
  }

  private initialize() {
    this.session = window.localStorage.getItem(this.identifier)

    if(!this.session) {
      this.session = uuid()
      window.localStorage.setItem(this.identifier, this.session)
    }
  }
}
