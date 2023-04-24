const jwt  = require('jsonwebtoken');
const User = require('../model/userSchema');

const Authenticate = async (req,res,next)=>{
    try{

        const token = req.cookies.jwtoken; //get token
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY); // verifytoken

        const rootUser = await User.findOne({_id: verifyToken._id,"tokens.token":token}); // if verify which user's token is ?

        if(!rootUser){ throw new Error('User not Found')} // if user not found throw err

        req.token = token;//user details
        req.rootUser = rootUser;//user details
        req.userID = rootUser._id;//user details

        next();
    }catch(err){
        res.status(401).send('Unauthorize:No token provided');
        console.log(err);
    }
}

module.exports = Authenticate;