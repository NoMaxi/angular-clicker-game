import { Component, Input, OnInit } from '@angular/core';

import { Ranking } from '../../interfaces/ranking';
import { RankingsService } from '../../services/rankings.service';

@Component({
  selector: 'app-rankings-mode-list',
  templateUrl: './rankings-mode-list.component.html',
  styleUrls: ['./rankings-mode-list.component.scss']
})
export class RankingsModeListComponent implements OnInit {
  @Input() gameMode: string;
  rankings: Ranking[];

  constructor(
    private rankingsService: RankingsService
  ) { }

  ngOnInit(): void {
    this.rankings = this.rankingsService.getRankingsByMode(this.gameMode, 10);
  }
}
