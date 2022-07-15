import { apagaFilhos } from "./misc";
import { recuperaRanking } from "./services/persistencia";

const ulRanking = document.querySelector<HTMLUListElement>("#ranking")!;

export function preencheRanking() {
  const rankAtual = recuperaRanking();
  apagaFilhos(ulRanking);
  rankAtual.forEach((rank) => {
    const novoIL = document.createElement("li") as HTMLLIElement;
    novoIL.textContent = `${rank.name}: ${rank.victories} vitórias`;
    ulRanking.appendChild(novoIL);
  });
}
