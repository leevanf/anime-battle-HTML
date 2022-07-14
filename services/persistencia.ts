export function persisteVitoria(idPersonagemVencedor: number) {
  let scoreAtual = parseInt(localStorage.getItem(idPersonagemVencedor));
  if (scoreAtual) {
    scoreAtual++;
  } else {
    scoreAtual = 1;
  }
  localStorage.setItem(idPersonagemVencedor, scoreAtual);
}
