const mongoose = require('mongoose');
require('dotenv').config();


exports.connect = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true


    }).then(()=> console.log(" db connection sucsessfull"))
    .catch((err)=>{
        console.log(err);
        
        console.log("connection error dattabase");
        process.exit(1)
    })

    
}
