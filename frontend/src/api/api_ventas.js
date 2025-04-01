import axios from './axios_config.js';

export const get_ventas = () => axios.get('/get_documentos', Controller.get_documentos);
export const get_ventas_por_fecha = (body) => axios.get('/get_documentos_por_fecha', body);

export const insertar_venta = (body) => axios.post('/insertar_documento', body);
export const insertar_producto = (id, body) => axios.post(`/insertar_subdocumento/${id}`, body);

export const acutalizar_venta = (id, body) => axios.put(`/actualizar_documento/${id}`, body);
export const actualizar_producto = (id, id_subdoc, body) => axios.put(`/actualizar_subdocumento/${id}/${id_subdoc}`, body);

export const eliminar_venta = (id) => axios.delete(`/eliminar_documento/${id}`);
export const eliminar_producto = (id, id_subdoc) => axios.delete(`/eliminar_subdocumento/${id}/${id_subdoc}`);
