export default function addQueryParamsToUrl(key = "", value = "") {
  if ("URLSearchParams" in window && key && value) {
    var searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    var newRelativePathQuery =
      window.location.pathname + "?" + searchParams.toString();
    history.pushState(null, "", newRelativePathQuery);
  }
}
