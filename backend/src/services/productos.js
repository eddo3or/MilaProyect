import Modelo from '../models/productos';

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
