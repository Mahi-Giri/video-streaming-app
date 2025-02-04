import { Router } from 'express';
import { uploadMovie, editMovie, deleteMovie, getVideos } from '../controller/video.controller.js';
import multer from 'multer';

const router = Router();

// Configure multer for multiple file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

router.get('/videos', getVideos);
router.post('/upload', 
  upload.fields([
    { name: 'videos', maxCount: 10 },  // Allow up to 10 video files
    { name: 'images', maxCount: 10 }   // Allow up to 10 image files
  ]), 
  uploadMovie
);
router.put('/edit/:id', editMovie);
router.delete('/delete/:id', deleteMovie);

export default router;

