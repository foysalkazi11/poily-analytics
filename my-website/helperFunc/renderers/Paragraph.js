import HTMLParser from "./HTMLParser.js";
import handleBlockData from "./useBlock.js";

const paragraph = (block) => {
  const { data, tunes } = block;
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align = alignment || left;

  return `<p
          class="blog_paragraph pt-10 pb-10"
      data-anchor="${handleBlockData(block)}"
      style="text-align: ${align};"
    >
      ${data?.text}
    </p>`;
};

export default paragraph;
