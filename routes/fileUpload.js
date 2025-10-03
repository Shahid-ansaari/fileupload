const express = require("express");
const router = express.Router();
// const {imageUpload, videoUpload,  imageReducerUpload, localFileUpload }= require('../controllars/fileupload');
const {localFileUpload }= require('../controllars/fileupload');




// api route 
router.post('/localfileupload',localFileUpload )


module.exports = router