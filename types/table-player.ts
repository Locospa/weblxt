export type TablePlayer = {
  player_id: number;
  player_name: string;
  photo_url?: string | null;
  played: number;
  wins: number;
  losses: number;
  points: number;
  streak: string;
  last_results: ("W" | "L")[];
};