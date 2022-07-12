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
