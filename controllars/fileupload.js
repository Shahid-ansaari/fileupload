const File = require("../models/File")


// localfileUpload handler functiom 
exports.localFileUpload = async (req, res)=> {
    try {
        // sabse pahle file fetch karo 
        const file = req.files.file
        console.log("file aa gayi ", file);

        // kis path pe 
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path - > " , path);
        

        file.mv(path , (err) => {
            console.log(err);
            
        });
        res.json({
            sucsess:true,
            massage:" file uploaded sucsesfyully"
 
        })

        
        
    } catch (error) {
        console.log(error);
        
        console.log("erron in local file upload");
        
    }
}