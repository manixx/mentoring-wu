import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject, from, combineLatest } from 'rxjs';
import { auth as fbAuth } from 'firebase/app';
import {map, switchMap, delay} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {settingsDocument, Setting} from 'src/app/setting';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly db: AngularFirestore,
  ) {}

  canActivate(): Observable<boolean> {

    return combineLatest([
      this.auth.user,
      this.db.doc<Setting>(settingsDocument)
        .valueChanges()
        .pipe(map(s => s.admins))
    ])
    .pipe(
      switchMap(([user, admins]) => {
        if (user) {
          if (!admins.includes(user.email)) {
            return from([false]);
          }
          return from([true]);
        }
        return from(this.auth.auth.signInWithRedirect(new fbAuth.GoogleAuthProvider()))
          .pipe(map(() => true));
      })
    );
  }
}
