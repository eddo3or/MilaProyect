import axios from './axios_config.js';

export const get_ventas = () => axios.get('/ventas/get_documentos');
export const get_ventas_por_fecha = (body) => axios.post('/ventas/get_documentos_por_fecha', body);

export const insertar_venta = (body) => axios.post('/ventas/insertar_documento', body);
export const insertar_producto = (id, body) => axios.post(`/ventas/insertar_subdocumento/${id}`, body);

export const actualizar_venta = (id, body) => axios.put(`/ventas/actualizar_documento/${id}`, body);
export const actualizar_producto = (id, id_subdoc, body) => axios.put(`/ventas/actualizar_subdocumento/${id}/${id_subdoc}`, body);

export const eliminar_venta = (id) => axios.delete(`/ventas/eliminar_documento/${id}`);
export const eliminar_producto = (id, id_subdoc) => axios.delete(`/ventas/eliminar_subdocumento/${id}/${id_subdoc}`);
