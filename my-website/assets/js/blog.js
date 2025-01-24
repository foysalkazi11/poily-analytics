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
const URL = "https://leg5p4sucfagxdqwvvfkoknk5i.appsync-api.us-east-1.amazonaws.com/graphql";
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
      // "Authorization": "eyJraWQiOiJtbDQzNlRuQ0l6ZzVpUzlqdlpTRmRwTnB1eWlsR0d0c0pDd1J6YVdQR1ZJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjZWJkNDFhZi1kNjM1LTQ1NTMtYWZiMS0wNjgxYTU5ZmE2ZDQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfbnExRjRRTDAxIiwiY29nbml0bzp1c2VybmFtZSI6ImNlYmQ0MWFmLWQ2MzUtNDU1My1hZmIxLTA2ODFhNTlmYTZkNCIsIm9yaWdpbl9qdGkiOiJjOWI2OWQ4ZC1kNDBkLTQzNjgtYWFiZi02YWE0ZThjMDcwNTYiLCJhdWQiOiIzbzRkM3ZqZTJyc2ZrcDEzZ25iamhvNWhoZSIsImV2ZW50X2lkIjoiMzM5OTc2YTEtMDU1Ny00MGZjLTgyNzYtODFmZDQxZDVjZTc5IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3Mzc2MDkxMjAsImV4cCI6MTczNzY5NTUyMCwiaWF0IjoxNzM3NjA5MTIwLCJqdGkiOiJhNjA1MmM3NS04NGJmLTRkZmYtODQyMS1iZGNmYmIyYzk2YjUiLCJlbWFpbCI6Im1kZm95c2Fsa2F6aUBnbWFpbC5jb20ifQ.ip71xF2ZEnbiLHalBlz59axfXapc_Jm7quFWJQEdiR4LWwWg_6nF_f00mFmOqv41mGjDKlUxiJ62j9iSwKb4HXPERk3kFsNksHgk5GzF6hBDfxAhgwGNHpjn3SCq71Vp1v7m98RK3VmckxvQXeJTOdyKdreLDF2tbyYthun2n0YxEWlDHR09XZt5hQhwWNS4puK9yf1YPfyt9najOvUeYeCrwbT_1_zvKGqhKdQd_C7s33rJkqHmwjb4JfoE8UwwteLQwPVhipeztd7DrccRDXR7eNn9bBcL9uf6JfeO27eIBKdp7GL-qd9lBG6CxER8-kvRiFMRnozPjAL2ok56IQ" 
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
