// import { Router } from "express";
// import { signout } from "../controller/user.controller.js";

// const router = Router();

// router.post("/signout", signout);

// export default router;

import { Router } from "express";
import { signout, updateProfile, getProfile } from "../controller/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = Router();

router.post("/signout", signout);
router.put("/update/:userId", verifyUser, updateProfile);
router.get("/profile/:userId", getProfile);

export default router;