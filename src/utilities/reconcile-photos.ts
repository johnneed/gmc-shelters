import fs from "fs";
import path from "path";

const extensions = ["jpg","gif", "png", "webp", "tiff", "jpeg", "bmp", "svg"];
export const readPhotoFiles = (folderName:string) => new Promise((resolve, reject) => {
    const myDir = path.resolve(__dirname, "../../photos/", folderName);
    fs.readdir(myDir, (err, files) => {
        if(err){
            console.error(err);
            reject(err);
        }
        const fileNames = files
            .filter(file => file.split(".")[-1].toLowerCase() in extensions)
            .map(file => path.resolve(myDir, file));
        resolve(fileNames);
    });
});

