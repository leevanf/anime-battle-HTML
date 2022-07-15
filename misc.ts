export function stringToHTML(str: string): HTMLElement {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  return doc.body;
}

export function apagaFilhos(elementoHTML: HTMLElement) {
  while (elementoHTML.children.length > 0) {
    elementoHTML.removeChild(elementoHTML.firstChild!);
  }
}
