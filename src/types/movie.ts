export type Movie = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  video: boolean;
};

export type Genre = {
  id: number;
  name: string;
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
};

export type Credits = {
  id: number;
  cast: CastMember[];
};

export type MovieDetails = Omit<Movie, 'genre_ids'> & {
  runtime: number | null;
  genres: Genre[];
  tagline: string | null;
  status: string;
  homepage: string | null;
  imdb_id: string | null;
  credits?: Credits;
};

export type PaginatedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type HomeFeed = 'trending' | 'popular';

export type SortOption =
  | 'popularity.desc'
  | 'vote_average.desc'
  | 'primary_release_date.desc';

export type SearchFilters = {
  query: string;
  genreId: number | null;
  year: number | null;
  minRating: number | null;
  sortBy: SortOption;
};

export type SavedMovie = Pick<
  Movie,
  | 'id'
  | 'title'
  | 'poster_path'
  | 'backdrop_path'
  | 'release_date'
  | 'vote_average'
  | 'overview'
  | 'genre_ids'
>;
