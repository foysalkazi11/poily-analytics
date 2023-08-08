import callout from "./renderers/Callout.js";
import column from "./renderers/Column.js";
import header from "./renderers/Header.js";
import image from "./renderers/Image.js";
import { List } from "./renderers/List.js";
import paragraph from "./renderers/Paragraph.js";
import Quote from "./renderers/Quote.js";
import generateTable from "./renderers/Table.js";

const jsonToHtml = (block, addBlockPadding = true, showHeaderIcon = false) => {
  const { type } = block;

  switch (type) {
    case "header":
      return header(block);
    case "paragraph":
      return paragraph(block);
    case "list":
      return List(block);
    case "image":
      return image(block);
    case "table":
      return generateTable(block);
    case "quote":
      return Quote(block);
    case "callout":
      return callout(block);
    case "columns":
      return column(block);

    default:
      return "";
  }
};

export default jsonToHtml;
