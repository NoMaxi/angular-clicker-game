import { Component, Input, OnInit } from '@angular/core';

import { Ranking } from '../../interfaces/ranking';

@Component({
  selector: 'app-rankings-item',
  templateUrl: './rankings-item.component.html',
  styleUrls: ['./rankings-item.component.scss']
})
export class RankingsItemComponent implements OnInit {
  @Input() ranking: Ranking;

  constructor() { }

  ngOnInit(): void { }
}
