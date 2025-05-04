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
    const accessToken = '1234567890';
    this.auth.accessToken = accessToken;
    localStorage.setItem('user', JSON.stringify(this._user));
    localStorage.setItem('accessToken', accessToken);
  }

  signOut(): void {
    this._user = { username: '', email: '', password: '' };
    localStorage.clear();
  }

  validateLogin(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
