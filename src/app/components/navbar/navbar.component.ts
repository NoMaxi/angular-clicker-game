import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { emptyUserData } from '../../helpers/emptyUserData';
import { User } from '../../interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentUserStoreService } from 'src/app/services/current-user-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isLoggedIn: boolean;
  user: User;

  constructor(
    private authService: AuthService,
    private currentUserStoreService: CurrentUserStoreService
  ) {}

  ngOnInit(): void {
    const sub = this.currentUserStoreService.userWatcher.subscribe((user) => {
      if (user.id) {
        this.user = user;
      }

      this.isLoggedIn = this.authService.isLoggedIn;
    }, (err) => console.error(err));
    this.subscription.add(sub);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogout(): void {
    this.authService.logoutCurrentUser();
    this.currentUserStoreService.data = { ...emptyUserData };
  }
}
