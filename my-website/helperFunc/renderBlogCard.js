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
    createdBy,
  } = blogData;
  const data = publishDate
    ? formatDate(new Date(publishDate))
    : { day: "", month: "", year: "" };

  const html = `
           <div class="blog_card ${modifyCard && "blog_card--row"}">
                  <img src=${coverImage} class="img" alt="img">
                  <div class="${modifyCard && "margin_left_20"}">
                   <a href="blogDetails.html?blogSlug=${slug}" > <h1 id=${slug} class="${
    allBlogPost ? "blog_card_heading_all_blog" : "blog_card_heading"
  } cursor-pointer margin_top_10 margin_bottom_10 ${
    allBlogPost
      ? "truncate line-clamp-one"
      : modifyCard
      ? "truncate line-clamp-three"
      : "truncate_two_tine"
  }">${title}</h1></a>
                  <p class="blog_card_description margin_bottom_10 ${
                    modifyCard
                      ? "truncate line-clamp-three"
                      : "truncate_two_tine"
                  }">${description}</p>
                  <div class="d-flex align-center justify-content-between margin_bottom_10">
                    <div class="d-flex align-center justify-content-center">
                    <div class="iconBox__authorAvatar">
                     ${
                       createdBy?.profilePicture
                         ? `<img  src=${createdBy?.profilePicture} alt="img" >`
                         : `<div ></div>`
                     }
                    </div>
                   
                      <div class="pl_10">
                        <h4 class="iconBox__authorName">${
                          `${createdBy?.displayName}`.toUpperCase() ||
                          `${createdBy?.firstName} ${createdBy?.lastName}`.toUpperCase()
                        }</h4>
                        ${
                          publishDate
                            ? `<p class="iconBox__authorPostDate">
                               ${data.day} ${data.month}, ${data.year}
                            </p>`
                            : ""
                        }
                        
                      </div>

                    </div>
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
