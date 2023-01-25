import express from "express"
const router = express.Router();

import deleteAccount from "../controllers/deleteAccount.js";
import verifyToken from "../middleware/auth.js";


router.route("/delete/:id").delete(verifyToken,deleteAccount);

export default router;