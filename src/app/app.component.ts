import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { CurrentUserStoreService } from './services/current-user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-project1';

  constructor(
    private authService: AuthService,
    private currentUserStoreService: CurrentUserStoreService
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.currentUserStoreService.initCurrentUser();
    }
  }
}
