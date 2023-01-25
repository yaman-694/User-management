import db from '../config/db.js';
import moment from 'moment';

const log = async (operation,ip)=>{
    // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const query = `INSERT INTO log (ip_address,time_stamp,operation) VALUES ('${ip}','${timestamp}','${operation}')`;
    await db.query(query,(err,results)=>{
        if(err){
            console.log(err);            
        }
        else{
            console.log(results);
        }
    });
}

export default log;