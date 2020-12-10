import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from '../interfaces/user';
import { emptyUserData } from '../helpers/emptyUserData';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserStoreService {
  private currentUser: User = emptyUserData;
  private userWatcherSource: BehaviorSubject<User> =
    new BehaviorSubject<User>(this.data);
  public userWatcher = this.userWatcherSource.asObservable();

  constructor(
    private authService: AuthService
  ) {}

  public get data(): User {
    return this.currentUser;
  }

  public set data(user: User) {
    this.currentUser = { ...user };
    this.userWatcherSource.next({ ...user });
  }

  public initCurrentUser(): void {
    if (this.authService.isLoggedIn) {
      this.data = this.authService.getCurrentUser();
    }
  }
}
