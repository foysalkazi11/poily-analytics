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
    createdAt,
    createdBy,
  } = blogData;
  const data = formatDate(new Date(createdAt));

  const html = `
           <div class="blog_card ${modifyCard && "blog_card--row"}">
                  <img src=${coverImage} class="img" alt="img">
                  <div class="${modifyCard && "margin_left_20"}">
                   <a href="blogDetails.html?blogSlug=${slug}" > <h1 id=${slug} class="${
    allBlogPost ? "blog_card_heading_all_blog" : "blog_card_heading"
  } cursor-pointer margin_top_10 margin_bottom_10 truncate_two_tine">${title}</h1></a>
                  <p class="blog_card_description margin_bottom_10 truncate_two_tine">${description}</p>
                  <div class="d-flex align-center justify-content-between margin_bottom_10">
                    <div class="d-flex align-center justify-content-center">
                      <div class="iconBox__authorAvatar"></div>
                      <div class="pl_10">
                        <h4>${
                          `${createdBy?.displayName}`.toUpperCase() ||
                          `${createdBy?.firstName} ${createdBy?.lastName}`.toUpperCase()
                        }</h4>
                        <p>${data.month} ${data.day}, ${data.year}</p>
                      </div>

                    </div>
                    <div class="d-flex align-center">
                      <div class="iconBox d-flex align-center justify-content-center">
                        <img src="./assets/img/share.svg" class="iconBox__icon" alt="icon">
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
