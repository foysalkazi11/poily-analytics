import authorInfo from "./authorInfo.js";
import formatDate from "./formateData.js";

export default function renderBlogCard(
  blogData,
  modifyCard = false,
  allBlogPost = false
) {
  const {
    _id,
    title,
    slug,
    description,
    coverImage,
    type,
    category,
    collections,
    isPublished,
    publishDate,
    createdAt,
    updatedAt,
    createdBy,
  } = blogData;
  const data = updatedAt
    ? formatDate(new Date(updatedAt))
    : { day: "", month: "", year: "" };

  const html = `
           <div class="blog_card ${modifyCard && "blog_card--row"}">
                  <img src=${coverImage} class="img" alt="img">
                  <div class="${modifyCard && "margin_left_20"}">
                   <a href="${slug}.html?blogSlug=${slug}" > <h1 id=${slug} class="${
    allBlogPost
      ? "blog_card_heading_all_blog margin_top_10"
      : "blog_card_heading"
  } cursor-pointer margin_bottom_10 ${
    allBlogPost
      ? "truncate line-clamp-one"
      : modifyCard
      ? "truncate line-clamp-three"
      : "truncate line-clamp-two"
  }">${title}</h1></a>
                  <p class="blog_card_description margin_bottom_10 ${
                    modifyCard || allBlogPost
                      ? "truncate line-clamp-four"
                      : "truncate line-clamp-three"
                  }">${description}</p>
                  <div class="d-flex align-center justify-content-between margin_bottom_10">
                  ${authorInfo(
                    createdBy?.profilePicture,
                    createdBy?.displayName ||
                      `${createdBy?.firstName} ${createdBy?.lastName}`,
                    updatedAt ? `${data.day} ${data.month}, ${data.year}` : ""
                  )}
                    <div class="d-flex align-center">
                      <div class="iconBox d-flex align-center justify-content-center">
                      <div data-slug=${slug}  class="iconBox__icon d-flex align-center justify-content-center transition-all cursor-pointer">
                       <img src="./assets/img/share.svg"  alt="icon">
                      </div>
                       
                      </div>
                    
                    </div>

                  </div>
                  </div>
                </div>
          `;
  return html;
}

const bookmarkIcon = `  <div class="iconBox d-flex align-center justify-content-center margin_left_10">
                        <img src="./assets/img/bookmark.svg" class="iconBox__icon" alt="icon">
                      </div>`;
