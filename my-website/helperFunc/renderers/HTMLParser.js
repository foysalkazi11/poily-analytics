export default function HTMLParser(htmlString) {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, "text/html");

  return html;
}
