// export const signout = (req, res, next) => {
//     try {
//         res.clearCookie("access_token", {
//             httpOnly: true,
//         });
//         res.status(200).json({ message: "User signed out successfully" });
//     } catch (error) {
//         next(error);
//     }
// };

import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signout = (req, res, next) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
        });
        res.status(200).json({ message: "User signed out successfully" });
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req, res, next) => {
    console.log(req.params);
    if (!req.user || req.user._id !== req.params.userId) {
        return next(errorHandler(403, "You can update only your account"));
    }

    try {
        let { username, password, bio, profilePicture } = req.body;
        
        // Check if username already exists
        if (username) {
            const existingUser = await User.findOne({ username });
            if (existingUser && existingUser._id.toString() !== req.params.userId) {
                return next(errorHandler(400, "Username already exists"));
            }
        }

        // Hash password if it's being updated
        if (password) {
            password = bcryptjs.hashSync(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: username || undefined,
                    password: password || undefined,
                    bio: bio || undefined,
                    profilePicture: profilePicture || undefined,
                }
            },
            { new: true, runValidators: true }
        );

        const { password: pass, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return next(errorHandler(404, "User not found"));
        }
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};