import header from "./renderers/Header.js";
import image from "./renderers/Image.js";
import list, { List } from "./renderers/List.js";
import paragraph from "./renderers/Paragraph.js";
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

    default:
      return "";
  }
};

export default jsonToHtml;
