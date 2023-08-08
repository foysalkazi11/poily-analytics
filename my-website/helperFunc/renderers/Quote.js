import handleBlockData from "./useBlock.js";

export default function Quote(block) {
  const data = block.data;
  let htmlString = `<blockquote
  id="${handleBlockData(block)}"
  data-anchor="${handleBlockData(block)}"
    class="blockquote">
  ${data?.text && `<p>${data.text}</p>`}
  ${
    data?.caption &&
    `<footer class="blockquote__footer">${data.caption}</footer>`
  }
 </blockquote>`;

  return htmlString;
}
