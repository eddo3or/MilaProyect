import { modelConfig } from "./modelConfig.js";

export const getAll = async (module) => {
    try {
        const config = modelConfig[module];
        if (!config) {
            console.log("No se encontró el módulo");
            return null;
        }

        const docs = await config.model.find();

        return docs;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export const getItem = async (module, id) => {
    try {
        const config = modelConfig[module];
        if (!config) {
            console.log("No se encontró el módulo");
            return null;
        }

        const doc = await config.model.findOne(
            { [config.idField]: id }
        );

        return doc;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export const insertItem = async (module, item) => {
    try {
        const config = modelConfig[module];
        if (!config) {
            console.log("No se encontró el módulo");
            return null;
        }

        const existe_documento = await config.model.findOne(
            { [config.idField]: item[config.idField] }
        );

        if (existe_documento) {
            return null;
        } else {
            const doc = await config.model.create(item);
            return doc;
        }
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export const insertSubdoc = async (module, subdoc, id, item) => {
    try {
        const config = modelConfig[module];
        if (!config) {
            console.log("No se encontró el módulo");
            return null;
        }

        const configSubdoc = config[subdoc];
        if (!configSubdoc) {
            console.log("No se encontró el subdocumento");
            return null
        }

        const doc = await config.model.findOneAndUpdate(
            { [config.idField]: id },
            { $push: { [subdoc]: item } }
        )
        return doc;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export const updateItem = async (module, id, values) => {
    try {
        const config = modelConfig[module];
        if (!config) {
            console.log("No se encontró el módulo");
            return null;
        }

        const doc = await config.model.findOneAndUpdate(
            { [config.idField]: id },
            values,
            { new: true }
        );

        return doc;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export const updateSubdoc = async (module, subdoc, id, idSubdoc, values) => {
    try {
        const config = modelConfig[module];
        if (!config) {
            console.log("No se encontró el módulo");
            return null;
        }

        const configSubdoc = config[subdoc];
        if (!configSubdoc) {
            console.log("No se encontró el subdocumento");
            return null
        }

        const doc = await config.model.findOneAndUpdate(
            { [config.idField]: id, [`${subdoc}.${configSubdoc.idField}`]: idSubdoc },
            { $set: { [`${subdoc}.$`]: values } },
            { new: true }
        );
        return doc;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export const deleteItem = async (module, id) => {
    try {
        const config = modelConfig[module];
        if (!config) {
            console.log("No se encontró el módulo");
            return null;
        }

        const query = { [config.idField]: id };
        const doc = await config.model.findOneAndDelete(query, { new: true });

        return doc;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export const deleteSubdoc = async (module, subdoc, id, idSubdoc) => {
    try {
        const config = modelConfig[module];
        if (!config) {
            console.log("No se encontró el módulo");
            return null;
        }

        const configSubdoc = config[subdoc];
        if (!configSubdoc) {
            console.log("No se encontró el subdocumento");
            return null
        }

        const doc = await config.model.findOneAndUpdate(
            { [config.idField]: id, [`${subdoc}.${configSubdoc.idField}`]: idSubdoc },
            { $pull: { [subdoc]: { [configSubdoc.idField]: idSubdoc } } },
            { new: true }
        );

        return doc;
    } catch (error) {
        console.log("Error: ", error.message);
        return false;
    }
}
