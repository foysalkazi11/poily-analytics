export const GET_ALL_GENERAL_BLOG = `
  query GetAllGeneralBlog($currentDate: String!, $brand: String, $category: String, $withPublished: Boolean) {
 getAllGeneralBlog(currentDate: $currentDate, brand: $brand, category: $category, withPublished: $withPublished) {
     _id
      title
      slug
      description
      coverImage
      type
      category
      collections
      isPublished
      publishDate
      createdAt
      body
      createdBy {
        _id
        displayName
        firstName
        lastName
        image
        profilePicture
      }
 } 
}
`;

export const GET_A_GENERAL_BLOG_BY_SLUG = `
query GetAgeneralBlogBySlug($memberId: ID, $slug: String!) {
 getAgeneralBlogBySlug(memberId: $memberId, slug: $slug) {
   _id
      title
      slug
      description
      coverImage
      type
      category
      collections
      isPublished
      createdAt
      body
      keywords
      createdBy {
        _id
        displayName
        firstName
        lastName
        image
        profilePicture
      }
} 
}
`;
