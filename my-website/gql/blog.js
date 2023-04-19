export const GET_ALL_GENERAL_BLOG = `
  query GetAllGeneralBlog($currentDate: String!) {
    getAllGeneralBlog(currentDate: $currentDate) {
      _id
      title
      slug
      description
      coverImage
      type
      category
      collections
      isPublished
    }
  }
`;
