import { Rank } from "../modelos/rank";

export function persisteVitoria(nomeVencedor: string) {
  let scoreAtual = parseInt(localStorage.getItem(nomeVencedor)!);
  if (scoreAtual) {
    scoreAtual++;
  } else {
    scoreAtual = 1;
  }
  localStorage.setItem(nomeVencedor, scoreAtual.toString());
}

export function recuperaRanking() {
  const rank: Rank[] = [];
  for (const key in localStorage) {
    if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
      const element = parseInt(localStorage[key]);
      const newRank = new Rank(key, element);
      rank.push(newRank);
    }
  }
  rank.sort((elementoA, elementoB) => {
    return elementoB.victories - elementoA.victories;
  });
  return rank;
}

export function clearRanking(ranking: HTMLUListElement){
  const rank = recuperaRanking()
  for (let element of rank){    
    localStorage.removeItem(element.name)
  }
  ranking.innerHTML = ""
}