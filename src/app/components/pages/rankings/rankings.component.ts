import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../../services/game.service';
import { RankingsService } from '../../../services/rankings.service';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {
  rankedModes: string[];
  wereAnyGamesPlayed: boolean;

  constructor(
    private router: Router,
    private gameService: GameService,
    private rankingsService: RankingsService,
  ) { }

  ngOnInit(): void {
    this.rankedModes = this.gameService.getRankedGameModes();
    this.wereAnyGamesPlayed = this.gameService.getGames().length !== 0;
  }

  resetRankings(): void {
    if (confirm('Rankings of all users will be reset.\n' +
      'Are you sure you want to continue?')) {
      this.rankingsService.resetRankings();
      this.router.navigate(['/game']);
    }
  }
}
