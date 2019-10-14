import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { auth } from 'firebase/app';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private readonly auth: AngularFireAuth,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.auth.user
      .pipe(user => {
        if(user) {
          return new BehaviorSubject(true)
        }
        else {
          return from(
            this.auth.auth.signInWithRedirect(new auth.GoogleAuthProvider)
          )
          .pipe(map(() => true))
        }
      })

  }
}
