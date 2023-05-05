import handleBlockData from "./useBlock.js";

const bullet = (children) => `<li>${children}</li>`;

const groups = (tag, items, className = "", align = "left", id) =>
  `<div class="${className}">
  <${tag} id=${id} data-anchor=${id} style="text-align:${align}">
   ${items.map((item, i) =>
     bullet(
       typeof item === "string"
         ? item
         : item?.items?.length > 0 &&
             groups(tag, item.items, `blog_list`, "left", id)
     )
   )}
  
  </${tag}>
  </div>
  `;

const list = (block) => {
  const { data, tunes } = block;
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align = alignment || left;

  const tag = data?.style === "ordered" ? `ol` : `ul`;

  return groups(tag, data.items, `blog_list`, align, handleBlockData(block));
};

export default list;

export function List(block) {
  const { data, tunes } = block;
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align = alignment || "left";
  const Tag = data?.style === "ordered" ? "ol" : "ul";
  const items = data?.items || [];

  const renderBullet = (item) => {
    if (typeof item === "string") {
      return item;
    } else {
      let bulletHtml = item?.content || "";
      if (item?.items?.length > 0) {
        const nestedList = item.items
          .map((nestedItem) => `<li>${renderBullet(nestedItem)}</li>`)
          .join("");
        bulletHtml += `<${Tag}>${nestedList}</${Tag}>`;
      }
      return bulletHtml;
    }
  };

  const renderList = () => {
    const listItems = items
      .map((item, i) => `<li>${renderBullet(item)}</li>`)
      .join("");
    return `<${Tag} id=${handleBlockData(block)} data-anchor=${handleBlockData(
      block
    )} style="text-align: ${align}">${listItems}</${Tag}>`;
  };

  return `<div class="blog_list">${renderList()}</div>`;
}
