import axios from './axios_config.js';

export const get_productos = () => axios.get('/productos/get_documentos');
export const get_info_producto = (codigo) => axios.get(`/productos/get_item/${codigo}`);
export const get_imagen = (id) => axios.get(`/productos/get_imagen/${id}`, { responseType: "blob" });
export const insertar_producto = (body) => axios.post('/productos/insertar_documento', body);
export const actualizar_producto = (id, body) => axios.post(`/productos/actualizar_documento/${id}`, body, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
export const eliminar_producto = (id) => axios.delete(`/productos/eliminar_documento/${id}`);
