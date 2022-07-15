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

export function getRandomAnime() {
  return new Promise<number[]>((resolve, reject) => {
    fetch(`https://api.jikan.moe/v4/random/anime`)
      .then((response) => {
        response.json().then((responseJSON) => {
          resolve([responseJSON.data.mal_id])
        });
      })
      .catch((error) => {
        reject(error)
      });
  });
}