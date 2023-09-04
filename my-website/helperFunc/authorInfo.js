const authorInfo = (profilePicture, authorName, publishDate) => {
  const html = `<div class="d-flex align-center justify-content-center">
                    <div class="iconBox__authorAvatar">
                     ${
                       profilePicture
                         ? `<img  src=${profilePicture} alt="img" >`
                         : `<div ></div>`
                     }
                    </div>
                   
                      <div class="pl_10">
                        <h4 class="iconBox__authorName">${`${authorName}`.toUpperCase()}</h4>
                        ${
                          publishDate
                            ? `<p class="iconBox__authorPostDate">
                               ${publishDate}
                            </p>`
                            : ""
                        }
                        
                      </div>
                    </div>`;

  return html;
};

export default authorInfo;
