/*
  Serviços que retornam um (ou mais) personagens
*/

import { baseURL } from ".";
import { Personagem } from "../modelos/personagem";

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
