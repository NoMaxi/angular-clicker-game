import { Injectable } from '@angular/core';

import { Game } from '../interfaces/game';
import { User } from '../interfaces/user';
import { GameProcess } from '../interfaces/game-process';
import { Ranking } from '../interfaces/ranking';
import { emptyGameData } from '../helpers/emptyGameData';
import { initialGameProcessData } from '../helpers/initialGameProcessData';
import { CurrentGameStoreService } from './current-game-store.service';
import { RankingsService } from './rankings.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(
    private currentGameStoreService: CurrentGameStoreService,
    private rankingsService: RankingsService,
    private userService: UserService
  ) { }

  getGames(): Game[] {
    let games: Game[] = [];
    const users: User[] = this.userService.getUsers();

    for (const user of users) {
      if (user.games.length !== 0) {
        games = [...games, ...user.games];
      }
    }

    return games;
  }

  generateNewGameId(): number {
    return this.getGames().length + 1;
  }

  getRankedGameModes(): string[] {
    return [...new Set(this.getGames().map((game: Game) => game.mode))]
      .sort((a, b) => this.getGameDuration(a) - this.getGameDuration(b));
  }

  getGameDuration(gameMode: string): number {
    return +gameMode.replace(' seconds', '');
  }

  updateGameData(paramObj: Partial<Game>): void {
    const currentGameData: Game = { ...this.currentGameStoreService.data };
    this.currentGameStoreService.data = { ...currentGameData, ...paramObj };
  }

  updateGameProcess(paramObj: Partial<GameProcess>): void {
    const currentGameProcessData: GameProcess =
      { ...this.currentGameStoreService.process };
    this.currentGameStoreService.process =
      { ...currentGameProcessData, ...paramObj };
  }

  resetGame(): void {
    const prevGameModeObj = { mode: this.currentGameStoreService.data.mode };
    this.updateGameData({ ...emptyGameData, ...prevGameModeObj });
    this.updateGameProcess(initialGameProcessData);
  }

  getResultMessage(game: Game): string {
    const { mode, result, username } = game;
    const currentGameRanking: Ranking =
      this.rankingsService.getCurrentGameRanking(game);

    if (currentGameRanking) {
      const { clicksPerSecond, rank }: Ranking = currentGameRanking;
      const record: number = this.rankingsService
        .getRecordRankingBeforeCurrentGameByMode(game)?.result;

      const basicMessage =
        `${username}, your result is ${result} clicks, average click speed -  ${clicksPerSecond} clicks per second. `;
      const specialMessageTypes = {
        NEW_HERO: `Congratulations, you have beaten the previous record! Now you are the new CLICKER HERO!`,
        VERY_GOOD: `Very good result! Currently your rank in '${mode}'-mode is ${rank}. Train more to become the new CLICKER HERO!`,
        GOOD: `Good result! Currently your rank in '${mode}'-mode is ${rank}. Train more to achieve better results!`,
        NOT_BAD: `Not bad! Your rank in '${mode}'-mode is ${rank}. Train more to achieve better results!`,
        BAD: `You were too slow... Your rank in '${mode}'-mode is ${rank}. You should train much more to achieve better results!`
      };
      let specialMessage: string;

      switch (true) {
        case !record || result > record:
          specialMessage = specialMessageTypes.NEW_HERO;
          break;
        case  result / record > 0.9:
          specialMessage = specialMessageTypes.VERY_GOOD;
          break;
        case result / record > 0.8:
          specialMessage = specialMessageTypes.GOOD;
          break;
        case result / record > 0.6:
          specialMessage = specialMessageTypes.NOT_BAD;
          break;
        default:
          specialMessage = specialMessageTypes.BAD;
      }

      return basicMessage + specialMessage;
    }
  }
}
