import { Injectable } from '@nestjs/common';
import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryResponse } from 'src/interfaces/cloudinary.interface';


const streamifier = require('streamifier');



@Injectable()
export class CloudinaryService {
    uploadImage({
        file, 
        date, 
        time
    }:{
            file: Express.Multer.File, 
            date:Date, 
            time:string
        }): Promise<CloudinaryResponse> 
    {
     return new Promise((resolve, reject) => {
            const now = new Date();
            const timestamp = `${date} - ${time}\n Sistema Argos`;

            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'argos',
                    sign_url: true,
                    transformation: [
                        
                        { overlay: { 
                            font_family: 'Arial', 
                            color: 'white', 
                            font_size: 24, 
                            text: timestamp, 
                            gravity: 'south_east', 
                            y: 10 
                        }}
                    ]
                },
                (error, result) => {
                    if (result) {
                        const photoUrl = cloudinary.url(result.public_id, { secure: true, sign_url: true });
                        resolve({...result, photoUrl});
                    } else {
                        reject(error);
                    }
                }
            );
            streamifier.createReadStream(file.buffer).pipe(stream);
        });
    }
}
