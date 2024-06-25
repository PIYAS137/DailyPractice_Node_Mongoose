import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';

cloudinary.config({
    cloud_name: 'do7nin6oo',
    api_key: '787966622996427',
    api_secret: '-Y8aRpRKfATTpHZMy4lb-htaEEQ',
});

export const sendImageToCloudinary = (imageName: string, path: string) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            path,
            { public_id: imageName.trim() },
            function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
                // delete a file asynchronously
                fs.unlink(path, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('File is deleted.');
                    }
                });
            },
        );
    });
};



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd()+'/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
 export const upload = multer({ storage: storage })







