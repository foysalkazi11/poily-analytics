export function addClass(element, className) {
  if (!element.classList.contains(className)) {
    element?.classList?.add(className);
  }
}
export function removeClass(element, className) {
  if (element.classList.contains(className)) {
    element?.classList?.remove(className);
  }
}
