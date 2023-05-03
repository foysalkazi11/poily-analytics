export default function removeQueryParamsFormUrl() {
  if ("URLSearchParams" in window) {
    window.location.href = window.location.origin + window.location.pathname;
  }
}
