import jsonToHtml from "../jsonToHtml.js";
import handleBlockData from "./useBlock.js";

const column = (block) => {
  const { data } = block;
  const cols = data?.cols || [];

  let htmlString = `
    <div 
    id="${handleBlockData(block)}"
    data-anchor="${handleBlockData(block)}"
    class="columns" 
    style="grid-template-columns:repeat(${cols?.length},1fr);">
    ${cols
      ?.map(
        (column) =>
          `<div> ${column?.blocks
            ?.map((block) => jsonToHtml(block))
            .join("")} </div>`
      )
      .join("")}
    </div>
    `;
  return htmlString;
};

export default column;
