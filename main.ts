import "./style.css";
import {
  buscaPersonagensParaBatalha,
  getCharacterFullById,
} from "./services/buscaPersonagem";
import { getAnimeCharacters, getAnimeFullByID } from "./services/buscaAnime";
import { PersonagemSimplificado } from "./modelos/personagem";
import { persisteVitoria } from "./services/persistencia";

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
  const personagemEsquerda = getCharacterFullById(batalhaAtual[0]).then(
    (personagem) => {
      imgsCharacters[0].src = personagem.images.jpg.image_url;
    }
  );
  const personagemDireita = getCharacterFullById(batalhaAtual[1]).then(
    (personagem) => {
      imgsCharacters[1].src = personagem.images.jpg.image_url;
    }
  );
}

function venceTorneio() {
  if (personagensTorneoAtual.length > 1) {
    throw new Error("Torneio Indefinido!");
  }
}

function animacaoVitoria() {}

function cleanupVitoria() {}

function votaPersonagem(button: HTMLButtonElement) {
  let vencedor = button.id == "leftVote" ? 0 : 1;
  personagensTorneoAtual.unshift(batalhaAtual[vencedor]);
  if (personagensTorneoAtual.length === 1) {
    persisteVitoria(batalhaAtual[vencedor]);
    animacaoVitoria();
    cleanupVitoria();
  } else {
    batalha();
  }
}

// setTimeout(criaNovoTorneio, 1000);
// setTimeout(batalha, 1500);
// criaNovoTorneio();
// console.log(personagensTorneoAtual);
// batalha();

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
  console.log(animesBatalha);
  buscaPersonagensParaBatalha(animesBatalha).then((personagens) => {
    personagensBatalhaValidos = personagens;
    //console.log(personagens);
    personagensTorneoAtual = criaNovoTorneio(personagens);
    //console.log(personagensTorneoAtual);
    batalha();
  });
});
