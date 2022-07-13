import "./style.css";
import { getCharacterFullById } from "./services/buscaPersonagem";
import { getAnimeCharacters, getAnimeFullByID } from "./services/buscaAnime";

const checkBoxesAnimes =
  document.querySelectorAll<HTMLInputElement>(".animeCheckbox")!;
const imgsCharacters =
  document.querySelectorAll<HTMLImageElement>(".characterImage")!;
const voteButtons =
  document.querySelectorAll<HTMLButtonElement>(".voteButton")!;
let animesBatalha: number[] = [1, 100];
let personagensBatalhaValidos: number[] = [];
let personagensTorneoAtual: number[] = [];
let batalhaAtual: number[] = [];

function buscaSelecionados() {
  const animeIDsSelecionados: number[] = [];
  checkBoxesAnimes.forEach((checkbox) => {
    if (checkbox.checked) {
      animeIDsSelecionados.push(parseInt(checkbox.id));
    }
  });
  return animeIDsSelecionados;
}

function buscaPersonagensParaBatalha() {
  const personagens: number[] = [];
  animesBatalha.forEach((animeId) => {
    getAnimeCharacters(animeId).then((personagensSimples) => {
      const personagensAnimeID = personagensSimples.map((elemento) => {
        return parseInt(elemento.character.mal_id);
      });
      personagens.push(...personagensAnimeID);
    });
  });
  personagensBatalhaValidos = personagens;
}

function criaNovoTorneio() {
  personagensTorneoAtual = [];
  for (let index = 0; index < 10; index++) {
    let idSorteado = -1;
    do {
      idSorteado =
        personagensBatalhaValidos[
          Math.floor(Math.random() * personagensBatalhaValidos.length)
        ];
    } while (personagensTorneoAtual.includes(idSorteado));
    personagensTorneoAtual.push(idSorteado);
  }
  batalhaAtual = personagensTorneoAtual.slice(0, 2);
  personagensTorneoAtual.splice(0, 2);
}

function batalha() {
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

buscaPersonagensParaBatalha();
console.log(personagensBatalhaValidos);
setTimeout(criaNovoTorneio, 1000);
setTimeout(batalha, 1500);
// criaNovoTorneio();
// console.log(personagensTorneoAtual);
// batalha();
