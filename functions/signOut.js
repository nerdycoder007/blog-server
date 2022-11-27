export const signOut = async (req, res) => {
  res.cookie("token", "");
  return res.send({
    ok: true,
  });
};
