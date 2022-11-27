import { PrismaClient } from "@prisma/client";
import { fileUpload } from "../../functions/fileUpload.js";
import readFileData from "../../functions/readFileData.js";

const prisma = new PrismaClient();

const blogResolver = {
  Mutation: {
    blogPost: async (
      _,
      {
        blogPostInput: {
          blogTitle,
          blogImage,
          blogContent,
          blogUserId,
          categoriesId,
        },
      }
    ) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: blogUserId },
        });
        if (user) {
          let blogImageUrl = await fileUpload(
            blogImage,
            `../public/blogFiles/${user.username}`,
            `http://localhost:8000/blogFiles/${user.username}`
          );

          let blogContentData = await readFileData(
            blogContent,
            `../public/blogFiles/${user.username}`,
            `public/blogFiles/${user.username}`
          );

          // TODO: Create Blog and save in database
          const createdBlog = await prisma.blogs.create({
            data: {
              blogTitle,
              blogImage: blogImageUrl,
              blogContent: blogContentData,
              blogUserId: blogUserId,
              categoriesId,
            },
          });
          console.log(createdBlog);
          // TODO: Assign blog id to each categories

          const updatedCategories = categoriesId.map(async (categoryId) => {});

          return createdBlog;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
export default blogResolver;
