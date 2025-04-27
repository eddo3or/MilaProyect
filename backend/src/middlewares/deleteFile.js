import mongoose from "mongoose";
import { GridFSBucket } from 'mongodb';

export const deleteFile = async (bucketName, idArchivo) => {
    return async (req, res, next) => {
        try {
            const fileID = mongoose.mongo.BSON.ObjectId.createFromHexString(idArchivo);

            const bucket = new GridFSBucket(mongoose.connection.db, {
                bucketName: bucketName
            });

            bucket.delete(fileID, function (error) {
                return res.json({ message: "Hubo un error borrando el archivo", error }).status(500);
            });

            next();
        } catch {
            return res.status(400).json({ message: "El ID del archivo es incorrecto o el archivo ya no existe" });
        }
    }
}
