import {v2 as cloudinary} from 'cloudinary';
import config from 'src/config/config';

export const CloudinaryProvider = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        return cloudinary.config({ 
            cloud_name: config().cloudinary.cloudName, 
            api_key: config().cloudinary.apiKey, 
            api_secret: config().cloudinary.apiSecret 
          });
    }
}



