import mongoose from "mongoose";
import { GridFSBucket } from 'mongodb';
import multer from "multer";
import { Readable } from "stream";

export default async function uploadFile(bucketName, fileField, fileName) {
    const upload = multer({ storage: multer.memoryStorage() });
    return upload.single(fileField)(req, res, next => {
        if (!fileName) return res.status(400).json({ message: "La solicitud NO TIENE NOMBRE DE ARCHIVO" })

        const readableStream = new Readable();
        readableStream.push(req.file.buffer);
        readableStream.push(null);

        let bucket = new GridFSBucket(mongoose.connection.db, {
            bucketName: bucketName
        });

        let uploadStream = bucket.openUploadStream(fileName);
        let id = uploadStream.id;
        readableStream.pipe(uploadStream);

        uploadStream.on("error", (err) => {
            return res.status(500).json({ message: "Hubo un error subiendo el archivo", err });
        });

        uploadStream.on("finish", () => {
            console.log(req.body);
            req[fileField] = id;
            next();
        });
    });
}