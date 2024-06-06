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
const BASE_URL = "https://www.poily.com/poily_analytics";

// fetch blog list and render
function getBlogList(category = null) {
  // get query string form url
  const getCategoryUrl = getQueryStringByQueryName("category");

  // make GraphQL query
  let variables = {
    currentDate: new Date().toISOString().slice(0, 10),
    brand: "643e2a567ce212e372cbfb69",
    category: getCategoryUrl === "all" ? "" : getCategoryUrl,
    withPublished: true,
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
      console.log(allBlogPost);
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
      addEventListenerToShareIcon();
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

// Function to copy text to clipboard
function copyToClipboard(text) {
  const textField = document.createElement("textarea");
  textField.value = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  document.body.removeChild(textField);
}

// show popup
function showPopup(message, targetElement) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.textContent = message;
  popup.style.visibility = "hidden";
  document.body.appendChild(popup);
  const top = targetElement.offsetTop - targetElement.clientHeight;
  const left = targetElement.offsetLeft - popup.clientWidth / 2;
  popup.style.left = `${left + 16}px`; // Adjust the positioning as needed
  popup.style.top = `${top - 10}px`; // Position at the center of the icon
  popup.style.visibility = "visible";

  setTimeout(() => {
    document.body.removeChild(popup);
  }, 1000);
}

// add event listeners to share icon
const addEventListenerToShareIcon = () => {
  // Get the copy button element
  const shareButtons = document.querySelectorAll(".iconBox__icon");

  shareButtons.forEach((element) => {
    // Add click event listener to the copy button
    element.addEventListener("click", (event) => {
      let target = event.target;
      if (target.tagName === "IMG" && target.parentElement) {
        target = target.parentElement;
      }
      // Get the current URL
      const currentURL = `${BASE_URL}/blogDetails.html?blogSlug=${target?.dataset?.slug}`;

      // Copy the URL to clipboard
      copyToClipboard(currentURL);
      // Show the popup
      showPopup("Copied!", target);
    });
  });
};
