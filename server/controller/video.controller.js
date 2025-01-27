import express from "express";
import Video from "../models/video.models.js";
import AWS from 'aws-sdk';

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














// import express from "express";
// import Video from "../models/video.models.js";
// import AWS from 'aws-sdk';

// const router = express.Router();

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// // Fetch Videos Endpoint
// export const getVideos = async (req, res) => {
//   const { page = 1, limit = 10, category } = req.query;
//   const skip = (page - 1) * limit;

//   try {
//     const query = category ? { category } : {}; // Filter by category if provided
//     const videos = await Video.find(query)
//       .skip(skip)
//       .limit(parseInt(limit))
//       .select("-__v"); // Exclude the `__v` field

//     const total = await Video.countDocuments(query);

//     res.json({
//       success: true,
//       data: videos,
//       currentPage: page,
//       totalPages: Math.ceil(total / limit),
//       totalVideos: total,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };


// export const videos = async (req, res, next) => {
//   const { page = 1, limit = 10 } = req.query;
//   const skip = (page - 1) * limit;

//   try {
//       const videos = await Video.find({})
//           .skip(skip)
//           .limit(parseInt(limit))
//           .select("title thumbnailUrl description");
//       const total = await Video.countDocuments();

//       res.json({
//           success: true,
//           data: videos,
//           currentPage: page,
//           totalPages: Math.ceil(total / limit),
//       });
//   } catch (error) {
//       res.status(500).json({ success: false, message: "Server Error" });
//   }
// };


// // Upload Video Endpoint
// export const uploadMovie = async (req, res) => {
//   console.log(req.body);
//   console.log("req.files", req.files);
//   try {
//     const { movieTitle, category, subscription, description } = req.body;
//     const videoFile = req.files["video"][0];
//     const imageFile = req.files["image"][0];

//     // Upload Video to S3
//     const videoKey = `${category}/videos/${Date.now()}-${videoFile.originalname}`;
//     const videoUploadParams = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: videoKey,
//       Body: videoFile.buffer,
//       ContentType: videoFile.mimetype,
//     };
//     const videoUploadResult = await s3.upload(videoUploadParams).promise();

//     // Upload Image to S3
//     const imageKey = `${category}/images/${Date.now()}-${imageFile.originalname}`;
//     const imageUploadParams = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: imageKey,
//       Body: imageFile.buffer,
//       ContentType: imageFile.mimetype,
//     };
//     const imageUploadResult = await s3.upload(imageUploadParams).promise();

//     // Save Movie Metadata to MongoDB
//     const newMovie = new Video({
//       title: movieTitle,
//       category,
//       subscription,
//       description,
//       videoUrl: videoUploadResult.Location,
//       thumbnailUrl: imageUploadResult.Location,
//     });

//     await newMovie.save();
//     res.status(201).json({ message: "Movie uploaded successfully", movie: newMovie });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

// export default router;
