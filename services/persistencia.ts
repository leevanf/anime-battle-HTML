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
  rank.sort((elementoA, elementeB) => {
    return elementeB.victories - elementoA.victories;
  });
  console.log(rank);
  return rank;
}
