// import prisma from "../../prisma/prisma.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const categoryResolver = {
  Query: {
    getCategories: async () => {
      try {
        const categories = await prisma.category.findMany();
        return categories;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    createCategory: async (_, { title }) => {
      console.log(title);
      try {
        const category = await prisma.category.create({
          data: {
            title,
          },
        });
        return category;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
export default categoryResolver;
