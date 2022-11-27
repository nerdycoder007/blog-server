import { PrismaClient } from "@prisma/client";
import { fileUpload } from "../../functions/fileUpload.js";
import readFileData from "../../functions/readFileData.js";

const prisma = new PrismaClient();

const blogResolver = {
  Query: {
    getBlogs: async () => {
      try {
        const blogs = await prisma.blogs.findMany({
          include: { Categories: { include: { category: true } } },
        });
        console.log("BLOGS", blogs);
        return blogs;
      } catch (error) {
        console.log(error);
      }
    },
  },
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
          // Save image and reveive url
          let blogImageUrl = await fileUpload(
            blogImage,
            `../public/blogFiles/${user.username}`,
            `http://localhost:8000/blogFiles/${user.username}`
          );

          // Save blog content file and recieve data
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
            },
          });
          console.log(createdBlog);

          // TODO: Assign blog id to each categories
          const blogId = createdBlog.id;
          categoriesId.map(
            async (categoryId) =>
              await prisma.categoriesOnBlogs.create({
                data: {
                  blogId,
                  categoryId,
                },
              })
          );

          return {
            blogTitle: createdBlog.blogTitle,
            blogImage: createdBlog.blogImage,
            blogContent: createdBlog.blogContent,
            createdAt: createdBlog.createdAt,
            upadtedAt: createdBlog.upadtedAt,
            blogUserId: createdBlog.blogUserId,
          };
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
export default blogResolver;
