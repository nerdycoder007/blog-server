import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "./generateTokens.js";
import createCookie from "./createCookie.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const refreshTokenFn = async (req, res) => {
  const refreshToken = req.cookies.token;
  console.log("Refershtoken", refreshToken);
  if (!refreshToken) {
    return res.send("Unauthorized");
  }

  let payload = null;
  try {
    payload = jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY);
    console.log(payload);
  } catch (error) {
    console.log("Error", error);
    return res.send("Bad refresh token");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });
  if (!user) {
    return res.send("User not found");
  }

  createCookie(user, res);
  const accessToken = await generateAccessToken(user);
  const decodedUser = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);
  return res.send({
    ok: true,
    accessToken: await generateAccessToken(user),
    ...decodedUser,
  });
};
