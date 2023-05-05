import HTMLParser from "./HTMLParser.js";
import handleBlockData from "./useBlock.js";

const header = (block) => {
  const { data, tunes } = block;
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align = alignment || left;

  const Tag = `h${data?.level || 1}`;

  return `<${Tag} 
  class="blog_heading${data?.level || 1} pb_10 padding_top_20"
  id="${handleBlockData(block)}"
  data-anchor="${handleBlockData(block)}" 
  style="text-align: ${align};"
  >
  ${data?.text}
  </${Tag}>`;
};

export default header;
