import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly identifier = 'session';

  key: string;

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.key = window.localStorage.getItem(this.identifier);

    if (!this.key) {
      this.key = uuid();
      window.localStorage.setItem(this.identifier, this.key);
    }
  }
}
