
export interface Odds {
  home: number;
  away: number;
  draw?: number;
}

export interface OverUnder {
  line: number;
  over: number;
  under: number;
}

export interface Handicap {
  line: number;
  home: number;
  away: number;
}

export enum MatchStatus {
  UPCOMING = 'UPCOMING',
  LIVE = 'LIVE',
  FINISHED = 'FINISHED',
}

export enum Sport {
  SOCCER = 'Soccer',
  BASKETBALL = 'Basketball',
  TENNIS = 'Tennis',
}

export interface Match {
  id: string;
  sport: Sport;
  homeTeam: string;
  awayTeam: string;
  startTime: number;
  status: MatchStatus;
  odds: {
    moneyline: Odds;
    overUnder: OverUnder;
    handicap: Handicap;
  };
  score?: {
    home: number;
    away: number;
  };
}

export type BetType = 'moneyline' | 'overUnder' | 'handicap';
export type BetOutcome = 'home' | 'away' | 'draw' | 'over' | 'under';

export type BetResult = 'pending' | 'won' | 'lost' | 'push';

export interface Bet {
  id: string;
  matchId: string;
  sport: Sport;
  type: BetType;
  outcome: BetOutcome;
  stake: number;
  odds: number;
  timestamp: number;
  result: BetResult;
  payout: number;
}

export interface User {
  balance: number;
  history: Bet[];
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  timestamp: number;
}

export interface ChatMessage {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    isStreaming?: boolean;
}
