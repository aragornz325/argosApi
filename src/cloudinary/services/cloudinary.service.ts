import { Injectable, Logger } from '@nestjs/common';
import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryResponse } from '../interfaces/cloudinary.interface';



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
            Logger.log('initializing cloudinary service')
            const timestamp = `Fecha: ${date.getDay()} - Mes: ${date.getMonth()} - Año: ${date.getFullYear()} - ${time} - - Sistema Argos`;
            Logger.log(`Uploading image to cloudinary`);
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'argos',
                    sign_url: true,
                    transformation: [
                        {effect: "outline", color: "black"},
                        {color: "white", overlay: {font_family: "roboto", font_size: 24, font_weight: "bold", text: timestamp}},
                        {flags: "layer_apply", gravity: "south", y: 20},
                    ]
                },
                (error, result) => {
                    if (result) {
                        Logger.log('image upload ok')
                        resolve(result);
                    } else {
                        Logger.fatal('fail to upload image')
                        reject(error);
                    }
                }
            );
            streamifier.createReadStream(file.buffer).pipe(stream);
        });
    }
}
