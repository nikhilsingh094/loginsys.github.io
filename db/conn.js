const mongoose = require('mongoose');

const DB = process.env.DATABASE

mongoose.connect(DB).then(()=>{
    console.log(`database connection successful`)
}).catch((err)=>{
    console.log(`something went wrong`,err)
})