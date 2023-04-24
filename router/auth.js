const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require('../middleware/authenticate')
const cookieParser = require('cookie-parser')
require("../db/conn");
const User = require("../model/userSchema");

router.use(cookieParser())

router.get("/", (req, res) => {
  res.send(`hello fro router home`);
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body; //data

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please filled all fields" });
  }

  //using promise
  //    User.findOne({email:email})
  //    .then((userExist)=>{
  //     if(userExist){
  //         return res.status(422).json({error:"email already exist"});
  //     }
  //     const user = new User({name ,email, phone, work, password, cpassword});

  //     user.save().then(()=>{
  //         res.status(201).json({message:'data saved'})
  //     }).catch((err)=>{
  //         res.status(500).json({error:'failed registered'})
  //     })
  //    }).catch((err)=>{
  //     console.log(err);
  //    })

  //   using async await

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "email already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password not matched" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      await user.save();

      res.status(201).json({ message: "data saved" });
    }
  } catch (err) {
    console.log(err);
  }
});

// signIn route or logIn route

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "please fill the data" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      //jwt token generated and stored cookie afterpassword match

      token = await userLogin.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      // end jwt token

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });
      } else {
        res.json({ message: "user signIn successful" });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// About Page



router.get('/about',authenticate,(req,res)=>{
  res.send(req.rootUser); 
});

// get data for contact us page and home page
router.get('/getcontactdata',authenticate,(req,res)=>{
  res.send(req.rootUser); 
});

// contact us page

router.post('/contact',authenticate, async (req,res)=>{

  try{

    const { name, email, phone, message } = req.body;
    if(!name || !email || !phone || !message){
      console.log("error in contact page");
      return res.json({error:"please filled the data"})
    }

    const userContact  = await User.findOne({_id:req.userID});

    if(userContact){
      const userMessage = await userContact.addMessage(name,email,phone,message);
      await userContact.save();
      res.status(201).json({message: "user contact message sent successfuly"})
    }

  }catch(err){
    console.log(err);
  }
});

// logout page

router.get('/logout',(req,res)=>{
  console.log(`Hello logout`);
  res.clearCookie('jwtoken',{path :'/'});
  res.status(200).send('Usser logout'); 
});

module.exports = router;
