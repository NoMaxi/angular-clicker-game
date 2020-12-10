import { Component, OnInit } from '@angular/core';

import { User } from '../../../interfaces/user';
import { CurrentUserStoreService } from '../../../services/current-user-store.service';
import { CurrentGameStoreService } from '../../../services/current-game-store.service';
import { GameProcess } from '../../../interfaces/game-process';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  user: User;
  isGameFinished: boolean;

  constructor(
    private currentUserStoreService: CurrentUserStoreService,
    private currentGameStoreService: CurrentGameStoreService
  ) { }

  ngOnInit(): void {
    this.currentUserStoreService.userWatcher
      .subscribe((user: User) => {
        if (user.id) {
          this.user = user;
        }
      }, (err) => console.error(err));

    this.currentGameStoreService.gameProcessWatcher
      .subscribe(({ isFinished }: GameProcess) => {
        this.isGameFinished = isFinished;
      }, (err) => console.error(err));
  }
}
