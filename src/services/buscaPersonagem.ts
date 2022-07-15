/*
  Serviços que retornam um (ou mais) personagens
*/

import { baseURL } from ".";
import { Personagem, PersonagemSimplificado } from "../modelos/personagem";
import { getAnimeCharacters } from "./buscaAnime";

export function getCharacterFullById(
  id: number,
  retries = 3
): Promise<Personagem> {
  if (retries < 1) {
    return Promise.reject("Excedidas o numero de tentativas");
  }
  return new Promise<Personagem>((resolve, reject) => {
    fetch(`${baseURL}characters/${id}/full`)
      .then((resposta) => {
        if (resposta.status != 200) {
          getCharacterFullById(id, --retries)
            .then((resp) => resolve(resp))
            .catch((reas) => reject(reas));
        } else {
          resposta.json().then((jason) => {
            resolve(jason.data);
          });
        }
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

export function buscaPersonagensParaBatalha(animesBatalha: number[]) {
  let animesParaBuscar = [];
  let personagens: number[] = [];
  if (animesBatalha.length > 3) {
    animesParaBuscar = animesBatalha.slice(0, 3);
    const resto = animesBatalha.slice(3);
    const promessas = [buscaPersonagensParaBatalha(animesParaBuscar)];
    return new Promise<number[]>((resolve, reject) => {
      setTimeout(() => {
        promessas.push(buscaPersonagensParaBatalha(resto));
        Promise.allSettled(promessas).then((promessasSettled) => {
          const promessasResolvidas = promessasSettled.filter(
            (elemento) => elemento.status === "fulfilled"
          ) as unknown as PromiseFulfilledResult<number[]>[];
          promessasResolvidas.forEach((promessaResolvida) => {
            personagens.push(...promessaResolvida.value);
          });
          resolve(personagens);
        });
      }, 3000 + Math.random() * 3000);
    });
  } else {
    animesParaBuscar = animesBatalha;
    return new Promise<number[]>((resolve, reject) => {
      const promessas: Promise<PersonagemSimplificado[]>[] = [];
      animesBatalha.forEach((animeId) => {
        promessas.push(getAnimeCharacters(animeId));
      });
      Promise.allSettled(promessas).then((promessasResolvidas) => {
        promessasResolvidas.forEach((personagensSimples) => {
          const personagensAnimeID = personagensSimples.value.map(
            (elemento: PersonagemSimplificado) => {
              return parseInt(elemento.character.mal_id);
            }
          );
          personagens.push(...personagensAnimeID);
        });
        resolve(personagens);
      });
    });
  }
}
