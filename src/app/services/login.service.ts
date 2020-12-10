import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { CurrentUserStoreService } from './current-user-store.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private currentUserStoreService: CurrentUserStoreService
  ) { }

  login(username: string): void {
    if (this.userService.isNewUser(username)) {
      this.userService.addNewUser(username);
    }

    const user = this.userService.getUserByName(username);
    this.authService.setCurrentUser(user);
    this.currentUserStoreService.initCurrentUser();
  }
}
