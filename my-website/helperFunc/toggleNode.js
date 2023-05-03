export default function toggleNode(node = `<div></div>`, display = false) {
  if (display) {
    node?.classList?.remove("display-none");
    node?.classList?.add("display-block");
  } else {
    node?.classList?.remove("display-block");
    node?.classList?.add("display-none");
  }
}
