import express from "express";
import Video from "../models/video.models.js";
import AWS from 'aws-sdk';
import multer from 'multer';

const router = express.Router();

// Configure multer for handling video file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory temporarily
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit the file size (e.g., 50MB)
}).fields([
  { name: 'video', maxCount: 1 }, // Accept only one video file
  { name: 'thumbnail', maxCount: 1 }, // Accept only one thumbnail image
]);


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Helper function to upload files to S3
const uploadToS3 = async (file, category, type) => {
  const key = `${category}/${type}/${Date.now()}-${file.originalname}`;
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  
  const result = await s3.upload(uploadParams).promise();
  return result.Location;
};

export const uploadMovie = async (req, res) => {
  try {
    if (!req.files || !req.files.videos || !req.files.images) {
      return res.status(400).json({ 
        success: false, 
        message: 'Both video and image files are required' 
      });
    }

    const { movieTitle, category, subscription, description } = req.body;
    const videoFiles = req.files.videos;
    const imageFiles = req.files.images;

    // Upload videos to S3
    const uploadedVideos = await Promise.all(
      videoFiles.map(file => uploadToS3(file, category, 'videos'))
    );

    // Upload images to S3
    const uploadedImages = await Promise.all(
      imageFiles.map(file => uploadToS3(file, category, 'images'))
    );

    // Create new video document
    const newMovie = new Video({
      title: movieTitle,
      category,
      subscription,
      description,
      videoUrls: uploadedVideos,
      thumbnailUrls: uploadedImages,
    });

    await newMovie.save();

    res.status(201).json({ 
      success: true,
      message: 'Movies uploaded successfully', 
      movie: newMovie 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
};

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

export const getVideos = async (req, res) => {
  const { page = 1, limit = 100, category } = req.query;
  const skip = (page - 1) * limit;

  try {
    const query = category ? { category } : {};
    const videos = await Video.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .select("-__v");

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


export const editMovie = async (req, res) => {
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

      if (req.files && req.files['videos']) {
        const uploadedVideos = [];
        for (const videoFile of req.files['videos']) {
          const videoKey = `${category}/videos/${Date.now()}-${videoFile.originalname}`;
          const videoUploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: videoKey,
            Body: videoFile.buffer,
            ContentType: videoFile.mimetype,
          };

          const videoUploadResult = await s3.upload(videoUploadParams).promise();
          uploadedVideos.push(videoUploadResult.Location);
        }
        updatedVideoData.videoUrls = uploadedVideos;
      }

      if (req.files && req.files['images']) {
        const uploadedImages = [];
        for (const imageFile of req.files['images']) {
          const imageKey = `${category}/images/${Date.now()}-${imageFile.originalname}`;
          const imageUploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: imageKey,
            Body: imageFile.buffer,
            ContentType: imageFile.mimetype,
          };

          const imageUploadResult = await s3.upload(imageUploadParams).promise();
          uploadedImages.push(imageUploadResult.Location);
        }
        updatedVideoData.thumbnailUrls = uploadedImages;
      }

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
  });
};



export default router;

