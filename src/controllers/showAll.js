import e from 'express';
import db from '../config/db.js';
import keys from '../config/keys.js';
const showAll = async (req, res) => {
    const adminUid = req.user;
    if(adminUid != keys.adminUid){
        res.status(403).json({message: "unauthorized"});
    }
    else{
        const query = `SELECT * FROM user`;
        await db.query(query,(err,results)=>{
            if(err){
                console.log(err);
                res.status(400).json({error: err.message});
            }
            else{
                console.log(results);
                res.status(200).json({message: "success",results: results});
            }
        });
    }
};


export default showAll;