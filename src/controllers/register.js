
//importing modules
import handlerror from '../middleware/err.js';
import dotenv from 'dotenv';
import uuid from 'uuid-random';
import db from '../config/db.js';
import md5 from 'md5';
import log from '../middleware/log.js';
dotenv.config();

//JWT function
import createToken from '../middleware/createToken.js';



const Postregister = async (req, res) => {

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;

  // console.log(name,email,password,confirm_password);
  if (confirm_password != password) {
    res.status(400).json({ "msg": "confirm password doesn't match" });
  }
  const hashed = md5(password);

  try {
    //generate uuid
    const userId = uuid();
    const userData = {
      userId: userId,
      name: name,
      email: email
    }
    if(userData.name == "" || userData.email == "" || userData.password == ""){
      res.status(400).json({ "msg": "Please fill all the fields" });
    }
    else{

      const query = `INSERT INTO user (userId, name, email, password) VALUES ('${userId}','${name}', '${email}', '${hashed}')`;
      db.query(query, (error, results) => {
        if (error) {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        log("register", ip);
        console.log(userData);
        const token = createToken(userId);
        res.cookie('auth', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
        res.json({ message: "Email already exist" });
      }
      else {
        console.log("success");
        const token = createToken(userId);
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        log("register", ip);
        res.cookie('auth', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
        res.status(201).json({ message: "success", user: userData })
      }
    
    });

  }
  } catch (err) {
    const error = handlerror(err);
    console.log(err)
    res.status(400).json(error);
  }
}
const getRegister = (req, res) => {
  res.status(200).json({ message: "Register page" });
}

export {
  Postregister,
  getRegister
} 