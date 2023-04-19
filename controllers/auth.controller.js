import User from "../models/User.js";
import {
  comparePassword,
  genreateToken,
  hashPassword,
} from "../utils/helperFunction.js";

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // validations
    if (email) return res.status(400).json({ message: "Email already exists" });
    if (!email || !password || !username)
      return res
        .status(400)
        .json({ status: false, message: "Please fill all details" });

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username: username,
      password: hashedPassword,
      email: email,
    });

    await newUser.save();

    res.status(200).send({
      success: true,
      message: "user created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: error });
  }
};

export const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    //validations
    if (!email || !password)
      return res
        .status(400)
        .json({ status: false, message: "Please fill all details" });

    const user = await User.findOne({ email: email });

    if (user) {
      const isMatch = comparePassword(password, user.password);
      if (isMatch) {
        const payload = {
          id: user._id,
          role: user.role,
        };

        const token = await genreateToken(payload);

        res.cookie("access_token", token, { httpOnly: true }).status(200).send({
          success: true,
          message: "user loggedIn successfully",
          token,
        });
      }
    } else {
      res.status(400).send({ success: false, message: "user not found" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: "error while logging" });
  }
};
