import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    next(errorHandler(400, "All fields are required"));
  } else {
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    try {
      await newUser.save();
      return res.status(200).json({ message: "User saved successfully" });
    } catch (error) {
      next(error);
    }
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) next(errorHandler(400, "All fields are required"));

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(400, "Invalid password"));

    const token = jwt.sign(
      {
        _id: validUser._id,
        isAdmin: validUser.isAdmin,
      },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoURL } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        {
          _id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatePassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

      const randomString = Math.random().toString(36).substring(7);
      const usernameWithRandom =
        name.split(" ").join("").toLowerCase() + randomString;

      const newUser = new User({
        username: usernameWithRandom,
        email,
        password: hashedPassword,
        profilePicture: googlePhotoURL,
      });

      await newUser.save();

      const token = jwt.sign(
        {
          _id: newUser._id,
          isAdmin: newUser.isAdmin,
        },
        process.env.JWT_SECRET
      );

      const { password, ...rest } = newUser._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
