import handleBlockData from "./useBlock.js";

const image = (block) => {
  const { data, tunes } = block;
  const html = `<figure
      class="blog_figure pt_10 pb_10"
      data-anchor="${handleBlockData(block)}" 
    >
          <img
          
            src=${data?.file?.url || ""}
            alt=${data?.caption || data?.file?.name}
            style="object-fit: ${
              data?.stretched ? "cover" : "contain"
            };border: ${data?.withBorder ? "3px solid #7dbd3b" : "none"};"
          >
        
    <figcaption>${data?.caption || ""}</figcaption>
    </figure>`;

  return html;
};

export default image;
