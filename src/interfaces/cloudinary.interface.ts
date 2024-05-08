import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';


export interface CloudinaryResponse extends UploadApiResponse {
    photoUrl: string;
}

export type CloudinaryErrorResponse = UploadApiErrorResponse;