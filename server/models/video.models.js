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
        category: {
            type: String,
            required: true,
        },
        subscription:{
            type:String,
            required:true,
        },
        
        videoUrls: [{ // Changed to array
            type: String,
            required: true,
          }],
          thumbnailUrls: [{ // Changed to array
            type: String,
            required: true,
          }],

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



