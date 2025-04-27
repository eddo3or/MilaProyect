import * as Servicios from '../services/productos.js';
import mongoose from "mongoose";
import { GridFSBucket } from 'mongodb';
import multer from "multer";
import { Readable } from "stream";

export const get_documentos = async (req, res, next) => {
    try {
        const docs = await Servicios.get_documentos();
        if (!docs) {
            return res.status(400).json({ message: 'No se encontraron productos registrados.' });
        } else {
            return res.status(200).json(docs);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const get_item = async (req, res, next) => {
    try {
        const doc = await Servicios.get_item(req.params.codigo);
        if (!doc) {
            return res.status(400).json({ message: 'No se encontró el producto.' });
        } else {
            return res.status(200).json(doc);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const get_imagen = async (req, res, next) => {
    try {
        const bucket = new GridFSBucket(mongoose.connection.db, {
            bucketName: "imagenes"
        });

        const downloadStream = bucket.openDownloadStream(mongoose.mongo.BSON.ObjectId.createFromHexString(req.params.id));

        downloadStream.on("data", (chunk) => {
            res.write(chunk);
        });

        downloadStream.on("error", (err) => {
            return res.status(404).json({ message: "Hubo un error descargando la imagen", err });
        });

        downloadStream.on("end", () => {
            return res.status(200).end();
        });
    } catch (error) {
        console.log(error); //Se imprime en la consola porque por algún motivo se convierte en null cuando se ponen en la respuesta
        return res.status(500).json({ message: "Hubo un error obteniendo la imagen del producto" });
    }
}

//POST
export const insertar_documento = async (req, res, next) => {
    try {
        const upload = multer({ storage: multer.memoryStorage() });
        upload.single('imagen')(req, res, (err) => {
            if (err) return res.status(400).json({ message: "Hubo un error al subir la imagen" });
            if (!req.body.name) return res.status(400).json({ message: "La solicitud NO TIENE NOMBRE DE ARCHIVO" })

            const readableStream = new Readable();
            readableStream.push(req.file.buffer);
            readableStream.push(null);

            let bucket = new GridFSBucket(mongoose.connection.db, {
                bucketName: "imagenes"
            });

            let uploadStream = bucket.openUploadStream(req.body.name);
            let id = uploadStream.id;
            readableStream.pipe(uploadStream);

            uploadStream.on("error", (err) => {
                return res.status(500).json({ message: "Hubo un error subiendo la imagen", err });
            });

            uploadStream.on("finish", async () => {
                const documento = {
                    codigo: req.body.codigo,
                    nombre: req.body.nombre,
                    talla: req.body.talla,
                    precio: req.body.precio,
                    unidades: req.body.unidades,
                    proveedor: req.body.proveedor,
                    color: req.body.color,
                    imagen: id,
                };

                const doc = await Servicios.insertar_documento(documento);
                if (!doc) {
                    return res.status(400).json({ message: 'No se pudo crear el producto' });
                } else {
                    res.status(201).json(doc);
                }
            });
        });
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error insertando el documento" });
    }
};

//PUT
export const actualizar_documento = async (req, res, next) => {
    try {
        const { id } = req.params;
        const valores = req.body;
        const doc = await Servicios.actualizar_documento(id, valores);
        if (!doc) {
            return res.status(400).json({ message: 'No se pudo actualizar el documento.' });
        } else {
            res.status(200).json(doc);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

//DELETE
export const eliminar_documento = async (req, res, next) => {
    try {
        const { id } = req.params;
        const doc = await Servicios.eliminar_documento(id);
        if (!doc) {
            return res.status(400).json({ message: 'No se pudo eliminar el documento.' });
        } else {
            res.status(200).json(doc);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
}
