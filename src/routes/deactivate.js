import express from "express"
const router = express.Router();

import verifyToken from "../middleware/auth.js";
import deactivateUser from "../controllers/deactivateAccount.js";



router.route("/deactivate").put(verifyToken,deactivateUser).get((req,res)=>{
    console.log(req.headers)
    res.send("Hello")
});

export default router;