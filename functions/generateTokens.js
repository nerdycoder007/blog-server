import jwt from "jsonwebtoken";
export async function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.username,
    },
    process.env.SECRET_ACCESS_KEY,
    { expiresIn: "5m" }
  );
}
export async function generateRefreshToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.username,
    },
    process.env.SECRET_REFRESH_KEY,
    { expiresIn: "90d" }
  );
}
