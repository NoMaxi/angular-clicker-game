import { Component, OnInit } from '@angular/core';

import { Game } from '../../interfaces/game';
import { CurrentGameStoreService } from '../../services/current-game-store.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss']
})
export class GameResultComponent implements OnInit {
  game: Game;
  resultMessage: string;

  constructor(
    private currentGameStoreService: CurrentGameStoreService,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.currentGameStoreService.gameWatcher.subscribe((game) => {
      if (game) {
        this.game = game;
        this.resultMessage = this.gameService.getResultMessage(game);
      }
    });
  }

  playAgain(): void {
    this.gameService.resetGame();
  }
}
