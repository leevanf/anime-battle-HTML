export const baseURL = "https://api.jikan.moe/";
function getCharacterFullById(id: number): Promise<Personagem> {
  fetch(`${baseURL}${id}`);
}
