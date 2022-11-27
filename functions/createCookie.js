import { generateRefreshToken } from "./generateTokens.js";

async function createCookie(user, res) {
  return res.cookie("token", await generateRefreshToken(user), {
    httpOnly: true,
    SameSite: "none",
    secure: true,
    maxAge: 100 * 24 * 60 * 60 * 1000, // 100 days
  });
}

export default createCookie;
