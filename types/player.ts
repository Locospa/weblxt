export type Player = {
  id: number;
  name: string;
  active: boolean;
  created_at: string;
  photo_url?: string | null;
  play_style?: string | null;
  short_description?: string | null;
  handedness?: string | null;
  strengths?: string | null;
};