import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Game } from '../interfaces/game';
import { GameProcess } from '../interfaces/game-process';
import { emptyGameData } from '../helpers/emptyGameData';
import { initialGameProcessData } from '../helpers/initialGameProcessData';

@Injectable({
  providedIn: 'root'
})
export class CurrentGameStoreService {
  private currentGame: Game = emptyGameData;
  private gameWatcherSource: BehaviorSubject<Game> =
    new BehaviorSubject<Game>(this.data);
  public gameWatcher = this.gameWatcherSource.asObservable();

  private gameProcess: GameProcess = initialGameProcessData;
  private gameProcessWatcherSource: BehaviorSubject<GameProcess> =
    new BehaviorSubject<GameProcess>(this.process);
  public gameProcessWatcher = this.gameProcessWatcherSource.asObservable();

  constructor() { }

  public get data(): Game {
    return this.currentGame;
  }

  public set data(game: Game) {
    this.currentGame = { ...game };
    this.gameWatcherSource.next({ ...game });
  }

  public get process(): GameProcess {
    return this.gameProcess;
  }

  public set process(process: GameProcess) {
    this.gameProcess = { ...process };
    this.gameProcessWatcherSource.next({ ...process });
  }
}
