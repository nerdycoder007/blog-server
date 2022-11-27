// import prisma from "../../prisma/prisma.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import createCookie from "../../functions/createCookie.js";
import { generateAccessToken } from "../../functions/generateTokens.js";
const prisma = new PrismaClient();
const authResolver = {
  Mutation: {
    userRegister: async (
      _,
      { userRegisterInput: { username, email, password, confirmPassword } }
    ) => {
      try {
        console.log("Registering");
        const isUsernameExists = await prisma.user.findUnique({
          where: { username },
        });

        if (isUsernameExists) {
          throw new GraphQLError("Username already taken", {
            extensions: {
              code: "CONFLICT",
              arguments: "username",
            },
          });
        }
        const isEmailExists = await prisma.user.findUnique({
          where: { email },
        });
        if (isEmailExists) {
          throw new GraphQLError("This email is already registered.", {
            extensions: {
              code: "CONFLICT",
              arguments: "email",
            },
          });
        }
        if (password === confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          await prisma.user.create({
            data: {
              username,
              email,
              password: hashedPassword,
            },
          });
          return "Registered Successfully";
        }
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
    userLogin: async (
      _,
      { userLoginInput: { email, password } },
      { req, res }
    ) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (user) {
          console.log(user);
          const validPassword = await bcrypt.compare(password, user.password);

          if (validPassword) {
            // Create cookie to user
            await createCookie(user, res);
            return {
              accessToken: await generateAccessToken(user),
              id: user.id,
              email: user.email,
              username: user.username,
            };
          } else {
            throw new GraphQLError("Incorrect email or password", {
              extensions: {
                code: "BAD_USER_INPUT",
              },
            });
          }
        } else {
          throw new GraphQLError("Incorrect email or password", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
};
export default authResolver;
