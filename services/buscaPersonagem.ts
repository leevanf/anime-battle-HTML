/*
  Serviços que retornam um (ou mais) personagens
*/

import { baseURL } from ".";
import { Personagem, PersonagemSimplificado } from "../modelos/personagem";
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
        Promise.allSettled(promessas).then((promessasResolvidas) => {
          promessasResolvidas.forEach((promessaResolvida) => {
            personagens.push(...promessaResolvida.value);
          });
          resolve(personagens);
        });
      }, 1500);
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
            (elemento) => {
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
