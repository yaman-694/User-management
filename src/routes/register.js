
import express from "express"
const router = express.Router();
import {Postregister,getRegister} from "../controllers/register.js";
import verifyToken from "../middleware/auth.js";

router.route("/register").get(verifyToken,getRegister).post(Postregister);

export default router;