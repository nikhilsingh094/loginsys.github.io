const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');



dotenv.config({path:'./config.env'});
require('./db/conn')//link database

const PORT = process.env.PORT;

app.use(express.json());//show data in to object
app.use(require('./router/auth'))//link router



//middleware
// const middleware = (req,res,next)=>{
//     console.log("i'm middleware");
//     next();
// }

//creating router
// app.get('/',(req,res)=>{
//     res.send(`hello from home`)
// })
// app.get('/contact',middleware,(req,res)=>{
//     res.send(`hello from contact`)
// })
// app.get('/signin',(req,res)=>{
//     res.send(`hello from signIn`)
// })
// app.get('/signup',(req,res)=>{
//     res.send(`hello from signUp`)
// })
//end routing

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});