import { GET_A_GENERAL_BLOG_BY_SLUG } from "../../gql/blog.js";
import authorInfo from "../../helperFunc/authorInfo.js";
import formatDate from "../../helperFunc/formateData.js";
import jsonToHtml from "../../helperFunc/jsonToHtml.js";
import makeInnerHtmlEmpty from "../../helperFunc/makeInnerHtmlEmpty.js";
import renderImage from "../../helperFunc/renderImage.js";
import getQueryStringByQueryName from "../../helperFunc/renderers/getQueryStringByQueryName.js";
import toggleNode from "../../helperFunc/toggleNode.js";

const loading = document.getElementById("loading");
const error = document.getElementById("no_blog_found");
const singleBlogDetailsContainer = document.getElementById(
  "single-blog-details"
);
const title = document.querySelector(".banner__title__secondary");
const description = document.querySelector(".paragraph-primary");
const authorInfoBox = document.querySelector(".iconBox");
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
      if (!detailsABlog) {
        toggleNode(error, true);
        toggleNode(loading, false);
        toggleNode(singleBlogDetailsContainer, false);
        return;
      }
      const parsedBody = JSON.parse(detailsABlog?.body);
      makeInnerHtmlEmpty(singleBlogDetailsContainer);
      makeInnerHtmlEmpty(title);
      makeInnerHtmlEmpty(description);

      // render title
      title.textContent = detailsABlog?.title;
      // render description
      description.textContent = detailsABlog?.description;
      // render author info

      // formate date
      const date = detailsABlog?.updatedAt
        ? formatDate(new Date(detailsABlog?.updatedAt))
        : { day: "", month: "", year: "" };

      authorInfoBox.innerHTML = authorInfo(
        detailsABlog?.createdBy?.profilePicture,
        detailsABlog?.createdBy?.displayName ||
          `${detailsABlog?.createdBy?.firstName} ${detailsABlog?.createdBy?.lastName}`,
        detailsABlog?.updatedAt
          ? `${date?.day} ${date?.month}, ${date?.year}`
          : ""
      );

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
      document.querySelectorAll(".cdx-tooltip").forEach((element) => {
        element.addEventListener("mouseenter", () => {
          element.setAttribute("data-tooltip-open", "");
          setTooltipPosition(element);
        });

        element.addEventListener("mouseleave", () => {
          element.removeAttribute("data-tooltip-open");
        });
      });
    })

    .catch((error) => {
      toggleNode(error, true);
      toggleNode(loading, false);
      toggleNode(singleBlogDetailsContainer, false);
    });
}

// window.onload = getBlogList;
// getAllFiltersMenu.forEach((element) => {
//   element.addEventListener("click", () => {
//     getBlogList(element.id);
//   });
// });

function setTooltipPosition(element) {
  const tooltip = element;
  if (!tooltip) return;

  // let position = "";

  // const tooltipRect = tooltip.getBoundingClientRect();
  // const spaceAbove = tooltipRect.top;
  // const spaceBelow = window.innerHeight - tooltipRect.bottom;
  // const spaceLeft = tooltipRect.left;
  // const spaceRight = window.innerWidth - tooltipRect.right;

  // if (spaceBelow >= tooltipRect.height + 10) {
  //   position = "below";
  // } else if (spaceAbove >= tooltipRect.height + 10) {
  //   position = "above";
  // } else if (spaceRight >= tooltipRect.width + 10) {
  //   position = " right";
  // } else if (spaceLeft >= tooltipRect.width + 10) {
  //   position = " left";
  // }

  tooltip.setAttribute("data-tooltip-position", "above");
}

window.addEventListener("resize", () => {
  document
    .querySelectorAll(".cdx-tooltip[data-tooltip-open]")
    .forEach((element) => {
      setTooltipPosition(element);
    });
});
document.addEventListener("DOMContentLoaded", getAgeneralBlogBySlug);

getAllFiltersMenu.forEach((element) => {
  element.addEventListener("click", () => {
    window.location.href = `blog.html?category=${element.id}`;
  });
});
