import express from "express";
import Video from "../models/video.models.js";

const router = express.Router();

export const videos = async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    try {
        const videos = await Video.find({})
            .skip(skip)
            .limit(parseInt(limit))
            .select("title thumbnailUrl description");
        const total = await Video.countDocuments();

        res.json({
            success: true,
            data: videos,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export default router;
