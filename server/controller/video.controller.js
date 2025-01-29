import express from "express";
import Video from "../models/video.models.js";
import AWS from 'aws-sdk';
import multer from 'multer';

const router = express.Router();+822.

// Configure multer for handling video file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory temporarily
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit the file size (e.g., 50MB)
}).fields([
  { name: 'video', maxCount: 1 }, // Accept only one video file
  { name: 'thumbnail', maxCount: 1 }, // Accept only one thumbnail image
]);

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


export const editMovie = async (req, res) => {
  // Use multer middleware for handling file upload
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: 'File upload error', error: err });
    }

    const { id } = req.params;
    const { title, description, category, subscription } = req.body;
    let updatedVideoData = { title, description, category, subscription };

    try {
      const video = await Video.findById(id);
      if (!video) {
        return res.status(404).json({ success: false, message: 'Video not found' });
      }

      // Check if a new video file is uploaded, and upload it to S3
      if (req.files && req.files['video']) {
        const videoFile = req.files['video'][0];
        const videoKey = `${category}/videos/${Date.now()}-${videoFile.originalname}`;
        const videoUploadParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: videoKey,
          Body: videoFile.buffer,
          ContentType: videoFile.mimetype,
        };

        const videoUploadResult = await s3.upload(videoUploadParams).promise();
        updatedVideoData.videoUrl = videoUploadResult.Location;
      }

      // Check if a new thumbnail image is uploaded, and upload it to S3
      if (req.files && req.files['thumbnail']) {
        const imageFile = req.files['thumbnail'][0];
        const imageKey = `${category}/images/${Date.now()}-${imageFile.originalname}`;
        const imageUploadParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: imageKey,
          Body: imageFile.buffer,
          ContentType: imageFile.mimetype,
        };

        const imageUploadResult = await s3.upload(imageUploadParams).promise();
        updatedVideoData.thumbnailUrl = imageUploadResult.Location;
      }

      // Update video document in the database
      const updatedVideo = await Video.findByIdAndUpdate(id, updatedVideoData, {
        new: true,
        runValidators: true,
      });

      if (!updatedVideo) {
        return res.status(404).json({ success: false, message: 'Video not found' });
      }

      res.status(200).json({
        success: true,
        message: 'Video updated successfully',
        video: updatedVideo,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  })};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findByIdAndDelete(id);

    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    res.status(200).json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


// Fetch Videos Endpoint
export const getVideos = async (req, res) => {
  const { page = 1, limit = 10, category } = req.query;
  const skip = (page - 1) * limit;

  try {
    const query = category ? { category } : {}; // Filter by category if provided
    const videos = await Video.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .select("-__v"); // Exclude the `__v` field

    const total = await Video.countDocuments(query);

    res.json({
      success: true,
      data: videos,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalVideos: total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};





const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadMovie = async (req, res) => {
    console.log(req.body)
    console.log("req.files" , req.files)
  try {
    const { movieTitle, category, subscription, description } = req.body;
    const videoFile = req.files['video'][0];
    const imageFile = req.files['image'][0];

    // Upload Video to S3
    const videoKey = `${category}/videos/${Date.now()}-${videoFile.originalname}`;
    const videoUploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: videoKey,
      Body: videoFile.buffer,
      ContentType: videoFile.mimetype,
    };

    const videoUploadResult = await s3.upload(videoUploadParams).promise();

    // Upload Image to S3
    const imageKey = `${category}/images/${Date.now()}-${imageFile.originalname}`;
    const imageUploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: imageKey,
      Body: imageFile.buffer,
      ContentType: imageFile.mimetype,
    };

    const imageUploadResult = await s3.upload(imageUploadParams).promise();

    // Save Movie Metadata to MongoDB
    const newMovie = new Video({
      title: movieTitle,
      category,
      subscription,
      description,
      videoUrl: videoUploadResult.Location,
      thumbnailUrl: imageUploadResult.Location,
    });

    await newMovie.save();
    res.status(201).json({ message: 'Movie uploaded successfully', movie: newMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};


export default router;

