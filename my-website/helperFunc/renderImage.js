export default function renderImage(url = "") {
  const html = `<div class="u-center-text"> <img src=${url} alt="img" class="img-fluid border-radius-20 margin-top-20 margin-bottom-20"> </div>`;
  return html;
}
