const express = require("express");
const router = express.Router();
// const {imageUpload, videoUpload,  imageReducerUpload, localFileUpload }= require('../controllars/fileupload');
const {localFileUpload,imageUpload, videoUpload  }= require('../controllars/fileupload');




// api route 
router.post('/localfileupload',localFileUpload )
router.post('/imageupload',imageUpload )
router.post('/videoupload',videoUpload )


module.exports = router