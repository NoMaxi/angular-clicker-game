import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CurrentGameStoreService } from '../../services/current-game-store.service';
import { GameService } from '../../services/game.service';
import { GameProcess } from '../../interfaces/game-process';

@Component({
  selector: 'app-game-mode',
  templateUrl: './game-mode.component.html',
  styleUrls: ['./game-mode.component.scss']
})
export class GameModeComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  gameModes = ['5 seconds', '10 seconds', '15 seconds'];
  gameMode = this.gameModes[0];
  isRadioGroupDisabled = false;

  constructor(
    private currentGameStoreService: CurrentGameStoreService,
    private gameService: GameService
  ) {  }

  ngOnInit(): void {
    this.gameService.updateGameData({ mode: this.gameMode });

    const sub = this.currentGameStoreService.gameProcessWatcher
      .subscribe(({ isStarted }: GameProcess) => {
        this.isRadioGroupDisabled = isStarted;
      }, (err) => console.error(err));
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onModeChange(): void {
    this.gameService.updateGameData({ mode: this.gameMode });
  }
}
