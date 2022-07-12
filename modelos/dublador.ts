import { Imagens } from "./imagens";

type PersonMAL = {
  mal_id: number;
  url: string;
  images: Imagens;
  name: string;
};

export type VoiceMAL = {
  language: string;
  person: PersonMAL;
};
