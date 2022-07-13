/*Serviços que retornam um (ou mais) animes*/

import { baseURL } from ".";
import { Anime } from "../modelos/anime";
import { PersonagemSimplificado } from "../modelos/personagem";

export function getAnimeFullByID(id: number): Promise<Anime> {
  return new Promise<Anime>((resolve, reject) => {
    fetch(`${baseURL}anime/${id}/full`)
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

export function getAnimeCharacters(id: number) {
  return new Promise<PersonagemSimplificado[]>((resolve, reject) => {
    fetch(`${baseURL}anime/${id}/characters`)
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
