const mongoose = require('mongoose')
const nodemailer = require("nodemailer")
require('dotenv').config();

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    tags: {
        type: String,

    },
    email: {
        type: String,
    }
})

/// craete post middilware for mailing 

fileSchema.post("save", async function (doc) {
    try {
        console.log(doc);

        // create transporter 
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        


        // email sent 
        let info = await transporter.sendMail({
            from: "codehelp",
            to: doc.email,
            subject: "New File uploaded omn cludinary ",
            html:`<h2>Hello ji </h2> <p>File uploaded</p> DOC url is: ${doc.imageUrl}`
        })
        console.log("INFO", info);
        


    } catch (error) {
        console.log(error);
        console.log("error in sending mail");
        
        

    }


})


const File = mongoose.model("File", fileSchema);
module.exports = File;