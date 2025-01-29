// import { Router } from "express";
// import { videos,uploadMovie } from "../controller/video.controller.js";
// import multer from 'multer';

// const router = Router();
// const upload = multer();

// router.post("/videos", videos);

// // Route for uploading movies
// router.post(
//     '/upload',
//     upload.fields([{ name: 'video' }, { name: 'image' }]),
//     uploadMovie
//   );



// export default router;





import { Router } from 'express';
import { videos, uploadMovie, editMovie, deleteMovie, getVideos } from '../controller/video.controller.js';
import multer from 'multer';

const router = Router();
const upload = multer();

router.get('/videos', getVideos);
router.post('/upload', upload.fields([{ name: 'video' }, { name: 'image' }]), uploadMovie);
router.put('/edit/:id', editMovie);
router.delete('/delete/:id', deleteMovie);

export default router;







// import { Router } from "express";
// import { videos, uploadMovie, getVideos } from "../controller/video.controller.js";
// import multer from "multer";

// const router = Router();
// const upload = multer();

// // Get Videos Endpoint
// router.get("/videos", getVideos);

// // Upload Video Endpoint
// router.post(
//   "/upload",
//   upload.fields([{ name: "video" }, { name: "image" }]),
//   uploadMovie
// );

// export default router;
