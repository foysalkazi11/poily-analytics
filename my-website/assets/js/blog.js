import {
  GET_ALL_GENERAL_BLOG,
  GET_A_GENERAL_BLOG_BY_SLUG,
} from "../../gql/blog.js";
import convertJsonToHtml from "../../helperFunc/convertJsonToHtml.js";
import formatDate from "../../helperFunc/formateData.js";
import jsonToHtml from "../../helperFunc/jsonToHtml.js";
import makeInnerHtmlEmpty from "../../helperFunc/makeInnerHtmlEmpty.js";
import renderBlogCard from "../../helperFunc/renderBlogCard.js";
import renderImage from "../../helperFunc/renderImage.js";
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
const URL = "https://srcblending-production.up.railway.app/graphql";

// fetch blog list and render
function getBlogList(category = null) {
  // make GraphQL query
  let variables = {
    currentDate: new Date().toISOString().slice(0, 10),
    brand: "643e2a567ce212e372cbfb69",
    category: null,
  };
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
      const featuresBlogList = data?.data?.getAllGeneralBlog.slice(0, 3) || [];
      const allBlogList = data?.data?.getAllGeneralBlog.slice(3) || [];
      makeInnerHtmlEmpty(featuresBlogLeft);
      makeInnerHtmlEmpty(featuresBlogRight);
      makeInnerHtmlEmpty(allBlogs);

      // render feature blog list
      featuresBlogList?.forEach((blog, index) => {
        const html = renderBlogCard(blog, index > 0 ? true : false);
        index === 0
          ? (featuresBlogLeft.innerHTML += html)
          : (featuresBlogRight.innerHTML += html);
      });

      // render all blog list except features blog
      allBlogList?.forEach((blog) => {
        let html = renderBlogCard(blog, false);
        allBlogs.innerHTML += html;
      });

      toggleNode(loading, false);
      toggleNode(blogListContainer, true);

      const allBlogCards = document.querySelectorAll(".blog_card_heading");
      allBlogCards.forEach(function (element) {
        element.addEventListener("click", () => {
          getAgeneralBlogBySlug(element.id);
        });
      });
    })

    .catch((error) => {
      toggleNode(error, true);
      toggleNode(loading, false);
      toggleNode(blogListContainer, false);
    });
}

// get single blog by slug
function getAgeneralBlogBySlug(slug = "") {
  // make GraphQL query
  const variables = {
    slug,
    memberId: null,
  };

  toggleNode(error, false);
  toggleNode(blogListContainer, false);
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
      const coverImage = renderImage(detailsABlog?.coverImage);
      singleBlogDetailsContainer.innerHTML += coverImage;
      parsedBody.blocks.forEach((block) => {
        let htmlForBlogDetails = jsonToHtml(block);
        console.log(htmlForBlogDetails);
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

document.addEventListener("DOMContentLoaded", getBlogList);
// window.onload = getBlogList;
getAllFiltersMenu.forEach((element) => {
  element.addEventListener("click", () => {
    getBlogList(element.id);
  });
});
