import { Injectable } from '@nestjs/common';
import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryResponse } from 'src/interfaces/cloudinary.interface';


const streamifier = require('streamifier');



@Injectable()
export class CloudinaryService {
    uploadImage(file: Express.Multer.File): Promise<CloudinaryResponse> {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {folder: 'nest-cloudinary', sign_url: true},
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