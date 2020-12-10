import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Ranking } from '../interfaces/ranking';
import { emptyRankingData } from '../helpers/emptyRankingData';
import { RankingsService } from './rankings.service';

@Injectable({
  providedIn: 'root'
})
export class RankingsStoreService {
  private rankings: Ranking[] = emptyRankingsData;
  private rankingsWatcherSource: BehaviorSubject<Ranking[]> =
    new BehaviorSubject<Ranking[]>(this.data);
  public rankingsWatcher = this.rankingsWatcherSource.asObservable();

  constructor(
    private rankingsService: RankingsService
  ) { }

  public get data(): Ranking[] {
    return this.rankings;
  }

  public set data(rankings: Ranking[]) {
    this.rankings = { ...rankings };
    this.rankingsWatcherSource.next({ ...rankings });
  }

  // public initRankings(): void {
  //   if (!!localStorage.getItem('rankings')) {
  //     this.data = this.rankingsService.getRankingsFromLS();
  //   }
  // }
}
