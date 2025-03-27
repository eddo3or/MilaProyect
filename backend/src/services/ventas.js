import Modelo from '../models/ventas.js';

export const get_documentos = async () => {
    try {
        return await Modelo.find();
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const get_documentos_por_fecha = async (fecha_inicio, fecha_fin) => {
    try {
        return await Modelo.find({
            fecha: {
                $gte: fecha_inicio,
                $lte: fecha_fin
            }
        });
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const insertar_documento = async (documento) => {
    try {
        const doc = new Modelo(documento);
        return await doc.save();
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const actualizar_documento = async (id, valores) => {
    try {
        return await Modelo.findOneAndUpdate({ _id: id }, valores, { new: true, });
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const eliminar_documento = async (id) => {
    try {
        return await Modelo.findOneAndDelete({ _id: id });
    } catch (error) {
        console.log("Error: ", error.message);
        return false;
    }
}

export const insertar_subdocumento = async (id, subdocumento) => {
    try {
        const doc = await Modelo.findByIdAndUpdate(
            id,
            { $push: { productos: subdocumento } }
        );
        return doc;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const actualizar_subdocumento = async (id, id_subdoc, valores) => {
    try {
        const doc = await Modelo.findOneAndUpdate(
            { _id: id, 'productos._id': id_subdoc },
            { $set: { 'productos.$': valores } }
        )
        return doc;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const eliminar_subdocumento = async (id, id_subdoc) => {
    try {
        const deletedItem = await Modelo.findByIdAndUpdate(
            id,
            { $pull: { productos: { _id: id_subdoc } } }
        );
        return deletedItem;
    } catch (error) {
        console.log("Error: ", error.message);
        return false;
    }
}
