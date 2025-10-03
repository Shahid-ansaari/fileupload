const express = require('express')
const app =express();
// const cookieparser = require('cookie-parser')
// app.use(cookieparser());
require('dotenv').config;
const port = process.env.PORT || 4000
app.use(express.json());
// const user = require('./routes/user')

const fileupload = require("express-fileupload")
app.use(fileupload());


///mouniting
// app.use("/api/v1", user)
//db connection to express
require('./config/database').connect();

// cloudeinary se connext karana hai 
require('./config/cloudinary').cloudinaryConnect();

app.get("/", (req, res) => {
  res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});

const Upload = require('./routes/fileUpload')
app.use("/api/v1" ,Upload)

//app ko live 
app.listen(port,()=>{
    console.log(`app is listening on port-${port}`);
    
})

