import helloResolver from "./hello.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import authResolver from "./authResolver.js";
import blogResolver from "./blogResolver.js";
import categoryResolver from "./categoryResolver.js";

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...helloResolver.Query,
    ...categoryResolver.Query,
  },
  Mutation: {
    ...authResolver.Mutation,
    ...blogResolver.Mutation,
    ...categoryResolver.Mutation,
  },
};
export default resolvers;
