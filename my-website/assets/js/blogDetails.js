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
const blogPostData = document.querySelector(".postDate");
const getAllFiltersMenu = document.querySelectorAll(".menuBox__text");
const SocialDiv = document.querySelector(".social_div");
const copyright = document.querySelector(".copyright");

const URL = "https://srcblending-production.up.railway.app/graphql";

// open social sharing window
function socialWindow(url) {
  var left = (screen.width - 570) / 2;
  var top = (screen.height - 570) / 2;
  var params =
    "menubar=no,toolbar=no,status=no,width=570,height=570,top=" +
    top +
    ",left=" +
    left;
  window.open(url, "NewWindow", params);
}

// get single blog by slug
function getAGeneralBlogBySlug() {
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

      const metaTagsInfo = {
        title: detailsABlog?.title,
        description: detailsABlog?.description,
        image: detailsABlog?.coverImage,
        url: window?.location?.href,
      };
      // change metaTagsInfo
      setMetaTagsInfo(metaTagsInfo);
      // set social links
      setShareLinks(metaTagsInfo);
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
          `${detailsABlog?.createdBy?.firstName} ${detailsABlog?.createdBy?.lastName}`
        // detailsABlog?.updatedAt
        //   ? `${date?.day} ${date?.month}, ${date?.year}`
        //   : ""
      );
      blogPostData.innerHTML = detailsABlog?.updatedAt
        ? `${date?.day} ${date?.month}, ${date?.year}`
        : "";

      // render cover image
      const coverImage = renderImage(detailsABlog?.coverImage);
      singleBlogDetailsContainer.innerHTML += coverImage;

      // render body
      parsedBody.blocks.forEach((block) => {
        let htmlForBlogDetails = jsonToHtml(block);
        singleBlogDetailsContainer.innerHTML += htmlForBlogDetails;
      });

      // set tooltip
      setTooltip();

      toggleNode(loading, false);
      toggleNode(SocialDiv, true);
      toggleNode(singleBlogDetailsContainer, true);
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

// set tooltip

function setTooltip() {
  document.querySelectorAll(".cdx-tooltip").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.setAttribute("data-tooltip-open", "");
      setTooltipPosition(element);
    });

    element.addEventListener("mouseleave", () => {
      element.removeAttribute("data-tooltip-open");
    });
  });
}

// set meta tag info

function setMetaTagsInfo({ title, description, image, url }) {
  //generate meta tags
  document.title = title;

  document?.head
    ?.querySelector(`meta[name="title"]`)
    ?.setAttribute("content", title);
  document?.head
    ?.querySelector(`meta[name="description"]`)
    ?.setAttribute("content", description);

  // Open Graph / Facebook
  document?.head
    ?.querySelector(`meta[property="og:title"]`)
    ?.setAttribute("content", title);
  document?.head
    ?.querySelector(`meta[property="og:description"]`)
    ?.setAttribute("content", description);
  document?.head
    ?.querySelector(`meta[property="og:image"]`)
    ?.setAttribute("content", image);
  document?.head
    ?.querySelector(`meta[property="og:url"]`)
    ?.setAttribute("content", url);

  // twitter
  document?.head
    ?.querySelector(`meta[property="twitter:title"]`)
    ?.setAttribute("content", title);
  document?.head
    ?.querySelector(`meta[property="twitter:description"]`)
    ?.setAttribute("content", description);
  document?.head
    ?.querySelector(`meta[property="twitter:image"]`)
    ?.setAttribute("content", image);
  document?.head
    ?.querySelector(`meta[property="twitter:url"]`)
    ?.setAttribute("content", url);
}

function setShareLinks({ title, description, image, url }) {
  const pageUrl = encodeURIComponent(document.URL);
  // const tweetDescription = encodeURIComponent(
  //   document.querySelector("meta[property='og:description']")?.innerHTML
  // );

  // console.log(pageUrl, tweetDescription);

  const socialIconFacebook = document.querySelector(".socialIcon.facebook");
  const socialIconTwitter = document.querySelector(".socialIcon.twitter");
  const socialIconLinkedin = document.querySelector(".socialIcon.linkedin");
  const socialIconEmail = document.querySelector(".email");

  socialIconFacebook.addEventListener("click", () => {
    const url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
    socialWindow(url);
  });
  socialIconTwitter.addEventListener("click", () => {
    const url =
      "https://twitter.com/intent/tweet?url=" +
      pageUrl +
      "&text=" +
      encodeURIComponent(description);
    socialWindow(url);
  });
  socialIconLinkedin.addEventListener("click", () => {
    const url =
      "https://www.linkedin.com/shareArticle?mini=true&url=" + pageUrl;
    socialWindow(url);
  });
  socialIconEmail.setAttribute(
    "href",
    `mailto:user@example.com?subject=${encodeURIComponent(
      title
    )}&body=${encodeURIComponent(description)} Link: ${pageUrl}
    `
  );
}

window.addEventListener("resize", () => {
  document
    .querySelectorAll(".cdx-tooltip[data-tooltip-open]")
    .forEach((element) => {
      setTooltipPosition(element);
    });
});
document.addEventListener("DOMContentLoaded", getAGeneralBlogBySlug);

getAllFiltersMenu.forEach((element) => {
  element.addEventListener("click", () => {
    window.location.href = `blog.html?category=${element.id}`;
  });
});

copyright.getElementsByTagName("h4")[0].innerHTML =`© 2022 POILY - ${new Date().getFullYear()}`

