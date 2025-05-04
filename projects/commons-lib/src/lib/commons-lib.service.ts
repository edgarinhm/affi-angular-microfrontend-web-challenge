import { Injectable } from '@angular/core';
import { IUser } from './models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class CommonsLibService {
  private _user: IUser = { username: '', email: '', password: '' };
  auth = { accessToken: '' };

  constructor() {}

  signIn(user: IUser): void {
    this._user = user;
    this.auth = { accessToken: '1234567890' };
    localStorage.setItem('user', JSON.stringify(this._user));
  }

  signOut(): void {
    this._user = { username: '', email: '', password: '' };
    this.auth = { accessToken: '' };
    localStorage.clear();
  }

  validateLogin(): boolean {
    return !!this.auth.accessToken;
  }
}
