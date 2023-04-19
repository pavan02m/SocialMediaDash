import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  try {
    const salt = bcryptjs.genSaltSync(10);
    const hashPass = bcryptjs.hashSync(password, salt);

    return hashPass;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcryptjs.compare(password, hashedPassword);
};

export const genreateToken = async (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};
