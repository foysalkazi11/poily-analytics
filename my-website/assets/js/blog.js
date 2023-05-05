import { GET_ALL_GENERAL_BLOG } from "../../gql/blog.js";
import { addClass, removeClass } from "../../helperFunc/addOrRemoveClass.js";
import addQueryParamsToUrl from "../../helperFunc/addQueryParamsToUrl.js";

import makeInnerHtmlEmpty from "../../helperFunc/makeInnerHtmlEmpty.js";
import renderBlogCard from "../../helperFunc/renderBlogCard.js";
import getQueryStringByQueryName from "../../helperFunc/renderers/getQueryStringByQueryName.js";
import toggleNode from "../../helperFunc/toggleNode.js";

const featuresBlogLeft = document.getElementById("feature-blogs-left");
const featuresBlogRight = document.getElementById("feature-blogs-right");
const allBlogs = document.getElementById("all-blogs");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const blogListContainer = document.getElementById("blog-list-container");
const singleBlogDetailsContainer = document.getElementById(
  "single-blog-details"
);
const getAllFiltersMenu = document.querySelectorAll(".menuBox__text");
const allBlogsContainer = document.getElementById("all-blogs-container");
const divider = document.getElementById("br");
const noBlogFound = document.getElementById("no_blog_found");
const URL = "https://srcblending-production.up.railway.app/graphql";

// fetch blog list and render
function getBlogList(category = null) {
  // get query string form url
  const getCategoryUrl = getQueryStringByQueryName("category");

  // make GraphQL query
  let variables = {
    currentDate: new Date().toISOString().slice(0, 10),
    brand: "643e2a567ce212e372cbfb69",
    category: getCategoryUrl === "all" ? "" : getCategoryUrl,
  };
  toggleNode(noBlogFound, false);
  toggleNode(singleBlogDetailsContainer, false);
  toggleNode(error, false);
  toggleNode(blogListContainer, false);
  toggleNode(loading, true);

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: GET_ALL_GENERAL_BLOG, variables }),
  })
    .then((response) => response.json())
    .then((data) => {
      const allBlogPost = data?.data?.getAllGeneralBlog;
      const featuresBlogList = allBlogPost?.slice(0, 3) || [];
      const allBlogList = allBlogPost?.slice(3) || [];
      makeInnerHtmlEmpty(featuresBlogLeft);
      makeInnerHtmlEmpty(featuresBlogRight);
      makeInnerHtmlEmpty(allBlogs);

      // if no blog found
      if (!allBlogPost.length) {
        toggleNode(loading, false);
        toggleNode(noBlogFound, true);
        return;
      }

      // render feature blog list
      featuresBlogList?.forEach((blog, index) => {
        const html = renderBlogCard(
          blog,
          featuresBlogList?.length === 2 ? false : index > 0 ? true : false
        );
        index === 0
          ? (featuresBlogLeft.innerHTML += html)
          : (featuresBlogRight.innerHTML += html);
      });

      // render all blog list except features blog
      allBlogList?.forEach((blog) => {
        let html = renderBlogCard(blog, false, true);
        allBlogs.innerHTML += html;
      });
      if (!allBlogList?.length) {
        toggleNode(allBlogsContainer, false);
        toggleNode(divider, false);
      }

      toggleNode(loading, false);
      toggleNode(blogListContainer, true);
    })

    .catch((error) => {
      toggleNode(error, true);
      toggleNode(loading, false);
      toggleNode(blogListContainer, false);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById(getQueryStringByQueryName("category"))
    ?.classList?.add("text-bold");
  getBlogList();
});
// window.onload = getBlogList;
getAllFiltersMenu.forEach((element) => {
  element.addEventListener("click", () => {
    addQueryParamsToUrl("category", element.id);
    getAllFiltersMenu.forEach((element) => removeClass(element, "text-bold"));
    if (element?.id === getQueryStringByQueryName("category")) {
      addClass(element, "text-bold");
    }
    getBlogList();
  });
});
