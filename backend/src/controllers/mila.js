import * as Services from '../services/common.js';

export const get = async (req, res, next) => {
    try {
        const { module, type, id } = req.query;

        let docs;

        switch (type) {
            case "all":
                docs = await Services.getAll(module);
                break;
            case "one":
                docs = await Services.getItem(module, id);
                break;
            default:
                return res.status(400).json({ message: 'Se requiere un tipo get (all o one).' });
        }

        if (!docs) {
            return res.status(400).json({ message: 'No se encontró ningún documento.' });
        } else {
            res.status(200).json(docs);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

//POST
export const insertItem = async (req, res, next) => {
    try {
        const { module, type, id, subdoc } = req.query;
        const item = req.body;

        let doc;

        switch (type) {
            case "doc":
                doc = await Services.insertItem(module, item);
                break;
            case "subdoc":
                doc = await Services.insertSubdoc(module, subdoc, id, item);
                break;
            default:
                return res.status(400).json({ message: 'Se requiere un tipo get (doc o subdoc).' });
        }

        if (!doc) {
            return res.status(400).json({ message: 'No se pudo crear el documento' });
        } else {
            res.status(201).json(doc);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

//PUT
export const updateItem = async (req, res, next) => {
    try {
        const { module, type, id, idSubdoc, subdoc } = req.query;
        const values = req.body;

        let doc;

        switch (type) {
            case "doc":
                doc = await Services.updateItem(module, id, values);
                break;
            case "subdoc":
                doc = await Services.updateSubdoc(module, subdoc, id, idSubdoc, values);
                break;
            default:
                return res.status(400).json({ message: 'Se requiere un tipo get (doc o subdoc).' });
        }

        if (!doc) {
            return res.status(400).json({ message: 'No se pudo actualizar el documento.' });
        } else {
            res.status(200).json(doc);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const deleteItem = async (req, res, next) => {
    try {
        const { module, type, id, idSubdoc, subdoc } = req.query;

        let doc;

        switch (type) {
            case "doc":
                doc = await Services.deleteItem(module, id);
                break;
            case "subdoc":
                doc = await Services.deleteSubdoc(module, subdoc, id, idSubdoc);
                break;
            default:
                return res.status(400).json({ message: 'Se requiere un tipo de borrado (logical o physical).' });
        }

        if (!doc) {
            return res.status(400).json({ message: 'No se pudo eliminar el documento.' });
        } else {
            res.status(200).json(doc);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
}
