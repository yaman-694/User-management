
import db from '../config/db.js';

const updateProfile =async (req, res) => {
    console.log(req.headers);
    const userId = req.user;
    const name = req.body.name;
    console.log(userId,name)
    const query = `UPDATE user SET name = '${name}' WHERE userId = '${userId}'`;
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

export default updateProfile;