import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        thumbnailUrl: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        likes: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
