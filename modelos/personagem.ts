import { AparenciaAnime, AparenciaManga } from "./anime";
import { VoiceMAL } from "./dublador";
import { Imagens } from "./imagens";

export type Personagem = {
  mal_id: number;
  url: string;
  images: Imagens;
  name: string;
  name_kanji: string;
  nicknames: string[];
  favorites: number;
  about: string;
  anime: AparenciaAnime[];
  manga: AparenciaManga[];
  voices: VoiceMAL[];
};

export type PersonagemSimplificado = {
  character: {
    mal_id: string;
    url: string;
    images: Imagens;
    name: string;
  };
  role: string;
  voice_actors: VoiceMAL[];
};
