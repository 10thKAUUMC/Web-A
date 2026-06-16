export type MovieDetail  = {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    tagline: string;
    poster_path: string;
    backdrop_path: string;
    genres: {
      id: number;
      name: string;
    }[];
    release_date: string;
    runtime: number;
    vote_average: number;
    vote_count: number;
    popularity: number;
    budget: number;
    revenue: number;
    status: string;
    homepage: string;
    adult: boolean;
    video: boolean;
    imdb_id: string;
    original_language: string;
    origin_country: string[];
    belongs_to_collection: null | {
      id: number;
      name: string;
      poster_path: string;
      backdrop_path: string;
    };
    production_companies: {
      id: number;
      logo_path: string | null;
      name: string;
      origin_country: string;
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
    spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
    }[];
  }