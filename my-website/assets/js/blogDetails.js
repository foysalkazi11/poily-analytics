import { GET_A_GENERAL_BLOG_BY_SLUG } from "../../gql/blog.js";
import jsonToHtml from "../../helperFunc/jsonToHtml.js";
import makeInnerHtmlEmpty from "../../helperFunc/makeInnerHtmlEmpty.js";
import renderImage from "../../helperFunc/renderImage.js";
import getQueryStringByQueryName from "../../helperFunc/renderers/getQueryStringByQueryName.js";
import toggleNode from "../../helperFunc/toggleNode.js";

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const singleBlogDetailsContainer = document.getElementById(
  "single-blog-details"
);
const title = document.querySelector(".banner__title__secondary");
const description = document.querySelector(".paragraph-primary");
const getAllFiltersMenu = document.querySelectorAll(".menuBox__text");
const URL = "https://srcblending-production.up.railway.app/graphql";

// get single blog by slug
function getAgeneralBlogBySlug() {
  // get query string form url
  const getSlugFormUrl = getQueryStringByQueryName("blogSlug");
  if (!getSlugFormUrl) return;

  // make GraphQL query
  const variables = {
    slug: getSlugFormUrl,
    memberId: null,
  };

  toggleNode(singleBlogDetailsContainer, false);
  toggleNode(error, false);
  toggleNode(loading, true);

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: GET_A_GENERAL_BLOG_BY_SLUG, variables }),
  })
    .then((response) => response.json())
    .then((data) => {
      const detailsABlog = data?.data?.getAgeneralBlogBySlug;
      const parsedBody = JSON.parse(detailsABlog?.body);
      makeInnerHtmlEmpty(singleBlogDetailsContainer);
      makeInnerHtmlEmpty(title);
      makeInnerHtmlEmpty(description);

      // render title
      title.textContent = detailsABlog?.title;
      // render description
      description.textContent = detailsABlog?.description;

      // render cover image
      const coverImage = renderImage(detailsABlog?.coverImage);
      singleBlogDetailsContainer.innerHTML += coverImage;

      // render body
      parsedBody.blocks.forEach((block) => {
        let htmlForBlogDetails = jsonToHtml(block);
        singleBlogDetailsContainer.innerHTML += htmlForBlogDetails;
      });

      toggleNode(singleBlogDetailsContainer, true);
      toggleNode(loading, false);
    })

    .catch((error) => {
      toggleNode(error, true);
      toggleNode(loading, false);
      toggleNode(singleBlogDetailsContainer, false);
    });
}

document.addEventListener("DOMContentLoaded", getAgeneralBlogBySlug);
// window.onload = getBlogList;
// getAllFiltersMenu.forEach((element) => {
//   element.addEventListener("click", () => {
//     getBlogList(element.id);
//   });
// });
