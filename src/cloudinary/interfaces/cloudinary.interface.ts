import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';


export interface CloudinaryResponse extends UploadApiResponse {
}

export type CloudinaryErrorResponse = UploadApiErrorResponse;