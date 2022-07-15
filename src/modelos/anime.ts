import { EntradaGenerica, LinkExterno } from "./entradaGenerica";
import { Imagens } from "./imagens";

type AparenciaAnimeUnico = {
  //Dados de uma única aparição em um anime
  mal_id: number;
  url: string;
  images: Imagens;
  title: string;
};

export type AparenciaAnime = {
  role: string;
  anime: AparenciaAnimeUnico;
};

type AparenciaMangaUnico = {
  mal_id: number;
  url: string;
  images: Imagens;
  title: string;
};

export type AparenciaManga = {
  role: string;
  manga: AparenciaMangaUnico;
};

type TrailerAnime = {
  youtube_id: string;
  url: string;
  embed_url: string;
};

type AiredAnime = {
  from: string;
  to: string;
  prop: {
    from: {
      day: number;
      month: number;
      year: number;
    };
    to: {
      day: number;
      month: number;
      year: number;
    };
    string: string;
  };
};

type BroadcastAnime = {
  day: string;
  time: string;
  timezone: string;
  string: string;
};

type RelationAnime = {
  relation: string;
  entry: EntradaGenerica[];
};

type ThemesAnime = {
  openings: string[];
  endings: string[];
};

export type Anime = {
  mal_id: number;
  url: string;
  images: Imagens;
  trailer: TrailerAnime;
  approved: boolean;
  titles: string[];
  title: string;
  title_english: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: AiredAnime;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: BroadcastAnime;
  producers: EntradaGenerica[];
  licensors: EntradaGenerica[];
  studios: EntradaGenerica[];
  genres: EntradaGenerica[];
  explicit_genres: EntradaGenerica[];
  themes: EntradaGenerica[];
  demographics: EntradaGenerica[];
  relations: RelationAnime[];
  theme: ThemesAnime;
  external: LinkExterno[];
  streaming: LinkExterno[];
};
