const URL = "https://srcblending-production.up.railway.app/graphql";
import { GET_ALL_GENERAL_BLOG } from "../../gql/blog.ts";
function loadData() {
  // make GraphQL query
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: GET_ALL_GENERAL_BLOG }),
  })
    .then((response) => response.json())
    .then((data) => {
      // loop through data and display
      data.forEach((item) => {
        const element = document.createElement("div");
        element.textContent = item.name;
        document.getElementById("data").appendChild(element);
      });
    })
    .catch((error) => console.error(error));
}
