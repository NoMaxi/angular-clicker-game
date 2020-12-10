import { Injectable } from '@angular/core';

import { User } from '../interfaces/user';
import { Game } from '../interfaces/game';
import { Ranking } from '../interfaces/ranking';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RankingsService {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  getRankings(): Ranking[] {
    const users: User[] = this.userService.getUsers();
    const rankings: Ranking[] = [];

    for (const user of users) {
      if (user.games.length !== 0) {
        for (const game of user.games) {
          const ranking: Ranking = {
            username: user.name,
            gameId: game.id,
            mode: game.mode,
            result: game.result,
            clicksPerSecond: +(game.result / +game.mode.replace(' seconds', '')).toFixed(2)
          };
          rankings.push(ranking);
        }
      }
    }

    return rankings;
  }

  getRankingsByMode(gameMode: string, displayedLimit: number = Infinity): Ranking[] {
    return this.getRankings()
      .filter((ranking: Ranking) => ranking.mode === gameMode)
      .sort((a, b) => b.result - a.result)
      .map((ranking, index) => ({ ...ranking, rank: index + 1 }))
      .slice(0, displayedLimit);
  }

  getRecordRankingBeforeCurrentGameByMode(game: Game): Ranking {
    return this.getRankingsByMode(game.mode)
      .filter((ranking: Ranking) => ranking.gameId !== game.id)[0];
  }

  getCurrentGameRanking(game: Game): Ranking {
    const rankingsByMode: Ranking[] = this.getRankingsByMode(game.mode);
    if (rankingsByMode) {
      return rankingsByMode.find((ranking: Ranking) => ranking.gameId === game.id);
    }
  }

  resetRankings(): void {
    const users: User[] = this.userService.getUsers();
    for (const user of users) {
      user.games.length = 0;
    }
    this.userService.setUsers(users);

    const currentUser = this.authService.getCurrentUser();
    currentUser.games.length = 0;
    this.authService.setCurrentUser(currentUser);
  }
}
