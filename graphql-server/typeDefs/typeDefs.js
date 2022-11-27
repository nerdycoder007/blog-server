import { gql } from "apollo-server-express";
const typeDefs = gql`
  scalar Upload
  type Query {
    sayHello: String!
    getCategories: [Category!]!
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
    email: String!
    username: String!
  }
  type Blog {
    blogTitle: String!
    blogImage: String!
    blogContent: String!
    createdAt: String!
    upadtedAt: String!
    blogUserId: String!
    Categories: [Category!]!
  }
  type Category {
    id: ID!
    title: String!
    Blogs: [Blog]
    blogsId: [ID]
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
