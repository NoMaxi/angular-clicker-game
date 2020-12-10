export interface Ranking {
  username: string;
  gameId: number;
  mode: string;
  result: number;
  clicksPerSecond: number;
  rank?: number;
}
