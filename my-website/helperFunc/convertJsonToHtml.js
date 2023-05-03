export default function convertJsonToHtml(content, node) {
  console.log(content);
  content.blocks.forEach((block) => {
    const element = document.createElement(block.type);
    Object.entries(block.data).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    if (block.data.text) {
      element.innerHTML = block.data.text;
    }
    node.appendChild(element);
  });
}
