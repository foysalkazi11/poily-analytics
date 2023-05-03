export default function renderImage(url = "") {
  const html = `<img src=${url} alt="img" class="img-fluid border-radius-20 margin-top-20 margin-bottom-20"  >`;
  return html;
}
