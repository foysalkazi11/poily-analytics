import HTMLParser from "./HTMLParser.js";
import handleBlockData from "./useBlock.js";

const header = (block) => {
  const { data, tunes } = block;
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align = alignment || left;

  const Tag = `h${data?.level || 1}`;

  return `<${Tag} 
  class="blog_heading${data?.level || 1} pt_10 pb_10"
  data-anchor="${handleBlockData(block)}" 
  style="text-align: ${align};"
  >
  ${data?.text}
  </${Tag}>`;
};

export default header;
