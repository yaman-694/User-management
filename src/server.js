import express from "express"
import register from './routes/register.js'
import updateProfile from './routes/UpdateProfile.js'
import mysql from 'mysql'
import deactivateAccount from './routes/deactivate.js'
import deleteAccount from './routes/deleteAccount.js'
import showAll from './routes/showAll.js'
const app = express();



//sql connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'myapp'
});
connection.connect();
app.use(express.urlencoded({extended: false}))
app.use(express.json())
// app.use(verifyToken);
//routes
app.use('/api/v1',register);
app.use('/api/v1',deactivateAccount);
app.use('/api/v1',updateProfile);
app.use('/api/v1',deleteAccount);
app.use('/api/v1',showAll);

//sample routes
app.get('/',(req,res)=>{
    res.send('Hello World')
})

let port = 4545;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})