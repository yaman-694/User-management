import express from "express"
const router = express.Router();

import verifyToken from "../middleware/auth.js";
import updateProfile from "../controllers/updateProfile.js";



router.route("/update").patch(verifyToken,updateProfile).get((req,res)=>{
    console.log(req.headers)
    res.send("Hello")
});


export default router;