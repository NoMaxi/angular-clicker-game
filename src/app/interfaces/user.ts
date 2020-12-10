import { Game } from './game';

export interface User {
  id: number;
  name: string;
  gamesPlayed: number;
  games: Game[];
}
