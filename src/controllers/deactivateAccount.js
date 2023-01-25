
import db from '../config/db.js';
import log from '../middleware/log.js';

const deactivateUser =async (req, res) => {
    const userId = req.user;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    log("deactivateUser", ip);
    const query = `UPDATE user SET active_status = 0 WHERE userId = '${userId}'`;
    await db.query(query,(err,results)=>{
        if(err){
            console.log(err);
            res.status(400).json({error: err.message});
        }
        else{
            console.log(results);
            if(results.affectedRows==0){
                res.status(400).json({message: "User not found"});
            }
            else
                res.status(200).json({message: "success",results: results});
        }
    });
}

export default deactivateUser;