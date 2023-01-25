import express from "express"
const router = express.Router();
import verifyToken from "../middleware/auth.js";
import showAll from "../controllers/showAll.js";

router.route("/showAll").get(verifyToken,showAll)

export default router;