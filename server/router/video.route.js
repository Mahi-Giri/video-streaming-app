import { Router } from "express";
import { videos,uploadMovie } from "../controller/video.controller.js";
import multer from 'multer';

const router = Router();
const upload = multer();

router.post("/videos", videos);

// Route for uploading movies
router.post(
    '/upload',
    upload.fields([{ name: 'video' }, { name: 'image' }]),
    uploadMovie
  );

export default router;
