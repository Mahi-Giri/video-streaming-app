import { Router } from "express";
import { videos } from "../controller/video.controller.js";

const router = Router();

router.post("/videos", videos);


export default router;
