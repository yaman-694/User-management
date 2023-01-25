import jwttoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



const auth = (req, res, next) => {
    try {
        const token = req.header("authorization").split(" ")[1];
        console.log(token);
        if (!token)
            return res
                .status(401)
                .json({ msg: "No authentication token, authorization denied." });
        console.log(process.env.JWT_SECRET)
        const verified = jwttoken.verify(token, process.env.TOKEN_HEADER_KEY);
        if (!verified)
            return res
                .status(401)
                .json({ msg: "Token verification failed, authorization denied." });

        req.user = verified.id;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

export default auth;