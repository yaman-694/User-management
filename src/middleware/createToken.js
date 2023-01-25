import jwt from 'jsonwebtoken';


const createtoken = (id)=>{

    // const userpower= md5(User_Type);
    const maxAge = 3*24*60*60;
    const Token = jwt.sign({id},process.env.TOKEN_HEADER_KEY,{
        expiresIn: maxAge
    });
    
    return Token;
}

export default createtoken;

