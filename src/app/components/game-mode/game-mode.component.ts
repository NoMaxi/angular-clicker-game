import { Component, OnInit } from '@angular/core';

import { CurrentGameStoreService } from '../../services/current-game-store.service';
import { GameService } from '../../services/game.service';
import { GameProcess } from '../../interfaces/game-process';

@Component({
  selector: 'app-game-mode',
  templateUrl: './game-mode.component.html',
  styleUrls: ['./game-mode.component.scss']
})
export class GameModeComponent implements OnInit {
  gameModes = ['5 seconds', '10 seconds', '15 seconds'];
  gameMode = this.gameModes[0];
  isRadioGroupDisabled = false;

  constructor(
    private currentGameStoreService: CurrentGameStoreService,
    private gameService: GameService
  ) {  }

  ngOnInit(): void {
    this.gameService.updateGameData({ mode: this.gameMode });
    this.currentGameStoreService.gameProcessWatcher
      .subscribe(({ isStarted }: GameProcess) => {
        this.isRadioGroupDisabled = isStarted;
      }, (err) => console.error(err));
  }

  onModeChange(): void {
    this.gameService.updateGameData({ mode: this.gameMode });
  }
}
