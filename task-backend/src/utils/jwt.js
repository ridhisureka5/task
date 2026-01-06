import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  console.log("JWT_SECRET =", process.env.JWT_SECRET); // 👈 TEMP
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
