import axios from './axios_config.js';

export const get_productos = () => axios.get('/productos/get_documentos');
export const insertar_producto = (body) => axios.post('/productos/insertar_documento', body);
export const actualizar_producto = (body) => axios.put(`/productos/actualizar_documento/${id}`, body);
export const eliminar_producto = () => axios.delete(`/productos/eliminar_documento/${id}`);
