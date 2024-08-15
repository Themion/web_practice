export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_langage: string;
  original_title: string;
  overview: string;
  popularity: string;
  poster_path: string;
  title: string;
  video: boolean;
  vote_average: string;
  vote_count: string;
};

export type Video = {
  iso_619_1: string;
  iso_3199_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};
