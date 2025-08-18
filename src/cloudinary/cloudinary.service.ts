import { Injectable } from "@nestjs/common";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
      api_key: process.env.CLOUDINARY_API_KEY!,
      api_secret: process.env.CLOUDINARY_API_SECRET!,
      secure: true,
    });
  }

  uploadBuffer(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<UploadApiResponse> {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          transformation: [{ fetch_format: "auto", quality: "auto" }],
        },
        (err, res) => (err || !res ? reject(err) : resolve(res)),
      );
      Readable.from(file.buffer).pipe(stream);
    });
  }

  uploadMany(
    files: Express.Multer.File[],
    folder?: string,
  ): Promise<UploadApiResponse[]> {
    return Promise.all(files.map((f) => this.uploadBuffer(f, folder)));
  }

  destroy(publicId: string): Promise<void> {
    return cloudinary.uploader.destroy(publicId);
  }

  destroyMany(publicIds: string[]): Promise<void[]> {
    return Promise.all(publicIds.map((id) => this.destroy(id)));
  }
}
