import db from '../config/db.js';
// import bcrypt from 'bcrypt';
import log from '../middleware/log.js';
import md5 from 'md5';
const deleteAccount = async (req, res) => {
    const userId = req.params.id;
    if(req.user!=userId){
        res.status(400).json({message: "invalid user"});
    }
    else{
        const password = req.body.password;
        const hashed = md5(password);
        console.log(hashed);
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        log("deleteAccount", ip);
        const query = `DELETE FROM user WHERE userId = '${userId}' AND password = '${hashed}'`;
        await db.query(query,(err,results)=>{
            if(err){
                console.log(err);
                res.status(400).json({error: err.message});
            }
            else{
                console.log(results);
                if(results.affectedRows==0){
                    res.status(400).json({message: "wrong password"});
                }
                else
                    res.status(200).json({message: "success",results: results});
            }
        });
    }
};

export default deleteAccount;