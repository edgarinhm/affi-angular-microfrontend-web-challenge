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
    localStorage.setItem('user', JSON.stringify(this._user));
    localStorage.setItem('accessToken', '1234567890');
  }

  signOut(): void {
    this._user = { username: '', email: '', password: '' };
    localStorage.clear();
  }

  validateLogin(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
