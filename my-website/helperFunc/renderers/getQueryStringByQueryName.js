export default function getQueryStringByQueryName(queryName) {
  // Get the query string from the current URL
  const queryString = window.location.search;

  // Parse the query string into a URLSearchParams object
  const params = new URLSearchParams(queryString);

  // Get the value of a specific parameter
  const name = params.get(queryName) || "";
  return name;
}
