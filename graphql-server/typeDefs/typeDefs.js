import { gql } from "graphql-tag";

const typeDefs = gql`
  scalar Upload
  type Query {
    sayHello: String!
    getCategories: [Category!]!
    getBlogs: [Blog!]!
  }
  type Mutation {
    userRegister(userRegisterInput: userRegisterInput!): String!
    userLogin(userLoginInput: userLoginInput!): User!
    blogPost(blogPostInput: blogPostInput!): Blog!
    createCategory(title: String!): Category!
  }

  type User {
    accessToken: String
    id: ID!
    username: String!
  }
  type Blog {
    id: Int!
    blogTitle: String!
    blogImage: String!
    blogContent: String!
    createdAt: String!
    upadtedAt: String!
    blogUserId: String!
    Categories: [BlogCategory]
  }
  type BlogCategory {
    blogId: Int!
    categoryId: Int!
    category: Category!
  }
  type Category {
    id: ID!
    title: String!
    Blogs: [CategoryBlog]
  }
  type CategoryBlog {
    blogId: Int!
    categoryId: Int!
    blog: Blog!
  }

  input userRegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  input userLoginInput {
    email: String!
    password: String!
  }
  input blogPostInput {
    blogTitle: String!
    blogImage: Upload!
    blogContent: Upload!
    blogUserId: Int!
    categoriesId: [Int!]!
  }
  input blogCategory {
    id: Int!
    title: String!
  }
`;

export default typeDefs;
