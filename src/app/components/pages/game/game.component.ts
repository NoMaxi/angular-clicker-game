import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../../../interfaces/user';
import { CurrentUserStoreService } from '../../../services/current-user-store.service';
import { CurrentGameStoreService } from '../../../services/current-game-store.service';
import { GameProcess } from '../../../interfaces/game-process';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  user: User;
  isGameFinished: boolean;

  constructor(
    private currentUserStoreService: CurrentUserStoreService,
    private currentGameStoreService: CurrentGameStoreService
  ) { }

  ngOnInit(): void {
    const sub1 = this.currentUserStoreService.userWatcher
      .subscribe((user: User) => {
        if (user.id) {
          this.user = user;
        }
      }, (err) => console.error(err));

    const sub2 = this.currentGameStoreService.gameProcessWatcher
      .subscribe(({ isFinished }: GameProcess) => {
        this.isGameFinished = isFinished;
      }, (err) => console.error(err));

    this.subscription.add(sub1);
    this.subscription.add(sub2);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
