/*
  Serviços que retornam um (ou mais) personagens
*/

import { baseURL } from ".";
import { Personagem } from "../modelos/personagem";
import { getAnimeCharacters } from "./buscaAnime";

export function getCharacterFullById(id: number): Promise<Personagem> {
  return new Promise<Personagem>((resolve, reject) => {
    fetch(`${baseURL}characters/${id}/full`)
      .then((resposta) => {
        resposta.json().then((jason) => {
          resolve(jason.data);
        });
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}

export async function getCharactersByAnimeIDOnly(
  idAnime: number
): Promise<string[]> {
  const personagensSimplificados = await getAnimeCharacters(idAnime);
  const idPersonagens = personagensSimplificados.map((personagem) => {
    return personagem.character.mal_id;
  });
  return idPersonagens;
}
