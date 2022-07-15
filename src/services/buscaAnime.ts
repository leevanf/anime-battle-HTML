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

export function getAnimeCharacters(id: number, retries = 3) {
  if (retries < 1) {
    return Promise.reject("Excedidas o numero de tentativas");
  }
  return new Promise<PersonagemSimplificado[]>((resolve, reject) => {
    fetch(`${baseURL}anime/${id}/characters`)
      .then((resposta) => {
        if (resposta.status != 200) {
          setTimeout(() => {
            getAnimeCharacters(id, --retries)
              .then((resp) => resolve(resp))
              .catch((reas) => reject(reas));
          }, 1500);
        }
        resposta.json().then((jason) => {
          resolve(jason.data);
        });
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}

export function getRandomAnimeTrio() {
  return new Promise<number[]>((resolve, reject) => {
    const promessas: Promise<number>[] = [];
    for (let index = 0; index < 3; index++) {
      promessas.push(getRandomAnime());
    }
    const idAnimesAleatorios: number[] = [];
    setTimeout(() => {
      Promise.allSettled(promessas).then((promessasettled) => {
        const promessasResolvidas = promessasettled.filter(
          (promessa) => promessa.status == "fulfilled"
        );
        promessasResolvidas.forEach(
          (resolvida: PromiseFulfilledResult<number>) => {
            idAnimesAleatorios.push(resolvida.value);
          }
        );
        resolve(idAnimesAleatorios);
      });
    }, 3000);
  });
}

function getRandomAnime() {
  return new Promise<number>((resolve, reject) => {
    fetch(`https://api.jikan.moe/v4/random/anime`)
      .then((response) => {
        response.json().then((responseJSON) => {
          resolve(responseJSON.data.mal_id);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}
