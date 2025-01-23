import { Router } from "express";
import { signout } from "../controller/user.controller.js";

const router = Router();

router.post("/signout", signout);

export default router;
