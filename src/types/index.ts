export interface IMovie {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: IGenre[];
  homepage: string;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ICompany[];
  production_countries: ICountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  // spoken_languages:[{english_name:English,iso_639_1:en,name:English}],
  status: string;
  tagline: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface ICompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
export interface ICountry {
  iso_3166_1: string;
  name: string;
}

export interface Error {
  message?: string;
}
export type ChildrenProps = {
  children: string | JSX.Element | JSX.Element[];
};
export type ImageConfig = {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  still_sizes: string[];
};
