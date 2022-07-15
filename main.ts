import "./style.css";
import {
  buscaPersonagensParaBatalha,
  getCharacterFullById,
} from "./services/buscaPersonagem";
import { persisteVitoria, recuperaRanking } from "./services/persistencia";
import { stringToHTML } from "./misc";
import { preencheRanking } from "./ranking";

const checkBoxesAnimes = document.querySelectorAll<HTMLInputElement>(
  '[name="checkboxAnime"]'
)!;
const imgsCharacters =
  document.querySelectorAll<HTMLImageElement>(".characterImage")!;
const voteButtons =
  document.querySelectorAll<HTMLButtonElement>(".voteButton")!;
const buttonSetParameters = document.querySelector<HTMLButtonElement>(
  "#setParametersButton"
)!;
const buttonStartBattle =
  document.querySelector<HTMLButtonElement>("#startBattleButton")!;

const divParametersList =
  document.querySelector<HTMLDivElement>("#parametersList")!;

const labelLeftCharacterName =
  document.querySelector<HTMLLabelElement>("#leftCharacterName")!;
const labelLeftCharacterAnime = document.querySelector<HTMLLabelElement>(
  "#leftCharacterAnime"
)!;
const labelRightCharacterName = document.querySelector<HTMLLabelElement>(
  "#rightCharacterName"
)!;
const labelRightCharacterAnime = document.querySelector<HTMLLabelElement>(
  "#rightCharacterAnime"
)!;

const divVote = document.querySelector<HTMLDivElement>("#voteDiv")!;
const divWinner = document.querySelector<HTMLDivElement>("#winnerDiv")!;

let animesBatalha: number[] = [];
let personagensBatalhaValidos: number[] = [];
let personagensTorneoAtual: number[] = [];
let batalhaAtual: number[] = [];

function buscaSelecionados() {
  const animeIDsSelecionados: number[] = [];
  checkBoxesAnimes.forEach((checkbox) => {
    if (checkbox.checked) {
      let ids = checkbox.id.split("_");
      ids.shift();
      let idsCorrigidos = ids.map((id) => {
        return parseInt(id);
      });
      animeIDsSelecionados.push(...idsCorrigidos);
    }
  });
  // console.log(animeIDsSelecionados);
  return animeIDsSelecionados;
}

function criaNovoTorneio(personagensValidos: number[]): number[] {
  let personagensSorteados: number[] = [];
  for (let index = 0; index < 6; index++) {
    let idSorteado = -1;
    do {
      let numero = Math.floor(Math.random() * personagensValidos.length);

      idSorteado = personagensValidos[numero];
    } while (personagensSorteados.includes(idSorteado));
    personagensSorteados.push(idSorteado);
  }
  // batalhaAtual = personagensTorneoAtual.slice(0, 2);
  // personagensTorneoAtual.splice(0, 2);
  return personagensSorteados;
}

function batalha() {
  batalhaAtual = personagensTorneoAtual.slice(0, 2);
  personagensTorneoAtual.splice(0, 2);
  // console.log(`Luta atual: ${batalhaAtual}`);
  // console.log(`Personagens Restantes: ${personagensTorneoAtual}`);
  const personagemEsquerda = getCharacterFullById(batalhaAtual[0]).then(
    (personagem) => {
      imgsCharacters[0].src = personagem.images.jpg.image_url;
      labelLeftCharacterName.innerText = personagem.name;
      labelLeftCharacterAnime.innerText = personagem.anime[0].anime.title;
    }
  );
  const personagemDireita = getCharacterFullById(batalhaAtual[1]).then(
    (personagem) => {
      imgsCharacters[1].src = personagem.images.jpg.image_url;
      labelRightCharacterAnime.innerText = personagem.anime[0].anime.title;
      labelRightCharacterName.innerText = personagem.name;
    }
  );
  imgsCharacters.forEach((imgContainer) => {
    imgContainer.src = "";
  });
  labelLeftCharacterName.innerText = "";
  labelLeftCharacterAnime.innerText = "";
  labelRightCharacterAnime.innerText = "";
  labelRightCharacterName.innerText = "";
}

function mudaVisibilidadeBotoes(visibilidade: "none" | "") {
  voteButtons.forEach((button) => {
    button.style.display = visibilidade;
  });
}

function animacaoVitoria(idVencedor: number) {
  mudaVisibilidadeBotoes("none");
  preencheRanking();
  document.querySelector<HTMLImageElement>("#winnerCharacterImage")!.src =
    imgsCharacters[idVencedor].src;
  document.querySelector<HTMLLabelElement>("#winnerCharacterName")!.innerText =
    idVencedor === 0
      ? labelLeftCharacterName.innerText
      : labelRightCharacterName.innerText;
  document.querySelector<HTMLLabelElement>("#winnerCharacterAnime")!.innerText =
    idVencedor === 0
      ? labelLeftCharacterAnime.innerText
      : labelRightCharacterAnime.innerText;
  divVote.style.display = "none";
  divWinner.style.display = "flex";
  const fireworksDiv = document.getElementById("showFireworksDiv")!;
  fireworksDiv.appendChild(
    stringToHTML(
      `<div class="firework"></div><div class="firework"></div><div class="firework"></div>`
    )
  );
  setTimeout(cleanupVitoria, 10000);
}

function cleanupVitoria() {
  document.getElementById("showFireworksDiv")!.innerHTML = "";
}

function votaPersonagem(button: HTMLButtonElement) {
  const vencedor = button.id == "leftVote" ? 0 : 1;
  personagensTorneoAtual.unshift(batalhaAtual[vencedor]);
  const nomeVencedor =
    vencedor == 0
      ? labelLeftCharacterName.innerText
      : labelRightCharacterName.innerText;
  if (personagensTorneoAtual.length === 1) {
    persisteVitoria(nomeVencedor);
    animacaoVitoria(vencedor);
  } else {
    batalha();
  }
}

preencheRanking();

mudaVisibilidadeBotoes("none");
voteButtons[0].addEventListener("click", (event) =>
  votaPersonagem(event.target as HTMLButtonElement)
);
voteButtons[1].addEventListener("click", (event) =>
  votaPersonagem(event.target as HTMLButtonElement)
);

buttonSetParameters.addEventListener("click", () => {
  if (window.getComputedStyle(divParametersList).maxHeight !== "0px") {
    divParametersList!.style.maxHeight = "0px";
  } else {
    divParametersList!.style.maxHeight = divParametersList?.scrollHeight + "px";
  }
});
buttonStartBattle.addEventListener("click", () => {
  animesBatalha = buscaSelecionados();
  // console.log(animesBatalha);

  buscaPersonagensParaBatalha(animesBatalha).then((personagens) => {
    personagensBatalhaValidos = personagens;
    //console.log(personagens);
    personagensTorneoAtual = criaNovoTorneio(personagens);
    //console.log(personagensTorneoAtual);
    mudaVisibilidadeBotoes("");
    divWinner.style.display = "none";
    divVote.style.display = "flex";
    batalha();
  });
});
