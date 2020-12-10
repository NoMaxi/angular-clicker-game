import { Component, OnInit } from '@angular/core';

import { emptyUserData } from '../../helpers/emptyUserData';
import { User } from '../../interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentUserStoreService } from 'src/app/services/current-user-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  user: User;

  constructor(
    private authService: AuthService,
    private currentUserStoreService: CurrentUserStoreService
  ) {}

  ngOnInit(): void {
    this.currentUserStoreService.userWatcher.subscribe((user) => {
      if (user.id) {
        this.user = user;
      }

      this.isLoggedIn = this.authService.isLoggedIn;
    }, (err) => console.error(err));
  }

  onLogout(): void {
    this.authService.logoutCurrentUser();
    this.currentUserStoreService.data = { ...emptyUserData };
  }
}
