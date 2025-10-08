const Video = require("../models/videoModel")
const File = require("../models/File")
const cloudinary = require('cloudinary').v2


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

////////


function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}


// upload to cloudinary 
// async function uploadFileToCloudinary (file, folder){
//     let options = folder
//     await cloudinary.uploader.upload(file.tempFilePath, options)

// }
// upload to cloudinary 
async function uploadFileToCloudinary(file, folder) {
    const options = {
        folder: folder,       // ✅ pass folder inside object
        resource_type: "auto"
    };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// for image video reduce 
// async function uploadFileToCloudinary(file, folder) {
//     const options = {
//         folder: folder,       // ✅ pass folder inside object
//         resource_type: "auto",
//          transformation: [
//             { width: 800, height: 800, crop: "limit" }, // ✅ max 800x800, keep aspect ratio
//             { quality: "auto" }, // ✅ compress automatically
//             { fetch_format: "auto" } // ✅ serve in modern format (webp/avif) if supported
//         ]
//     };
//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }


// image upload handler 
exports.imageUpload= async (req, res) =>{
    try {
        const {name , tags, email} = req.body;
        console.log(name , email , tags);

        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ["jpg", "png", "jpeg"];
        // const fileType = file.name.split(".")[1].toLowerCase();
        const fileType = file.name.split(".").pop().toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                sucsess:false,
                massage: "file not supported"
            })
        }

        // file tyope supported hgai 
        const response  = await uploadFileToCloudinary(file, "shahidimages")

        res.json({
            sucsess:true,
            massage:"image uploaded sucsessfully"
        })


        // db me entry karni hai 
        const filedat = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })


        
        
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            sucsess:false,
            massage:"something went wrom=ng in image uploadation"
        })
        
        
    }

}



///video upload
// video upload handler 
exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, email, tags);

        const file = req.files.videoFIle;  // 👈 your frontend form should send field name as "videoFile"
        console.log(file);

        // validation
        const supportedTypes = ["mp4", "mov", "avi", "mkv"];
        const fileType = file.name.split(".").pop().toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "Video file type not supported"
            });
        }

        // upload to cloudinary
        const response = await uploadFileToCloudinary(file, "shahidvideos");
        console.log(response);
        

        res.json({
            success: true,
            message: "Video uploaded successfully",
            url: response.secure_url,     // ✅ video URL from Cloudinary
            public_id: response.public_id,
            duration: response.duration   // ✅ you also get duration info for videos
        });

        // (Optional) Save DB entry here...
                // save in DB
        const videoDoc = await Video.create({
            name,
            email,
            tags,
            public_id: response.public_id,
            url: response.secure_url,
            duration: response.duration,
            size: response.bytes
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong in video upload"
        });
    }
};