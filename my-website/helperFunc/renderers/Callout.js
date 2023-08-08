import handleBlockData from "./useBlock.js";

const callout = (block) => {
  const { data } = block;

  let htmlString = `
    <div 
    class="callout"
    id="${handleBlockData(block)}"
    data-anchor="${handleBlockData(block)}"
     >
    <div class="callout__icon">💡</div>
    <pre class="callout__text">${data?.code}</pre>
    </div>
    `;
  return htmlString;
};

export default callout;
