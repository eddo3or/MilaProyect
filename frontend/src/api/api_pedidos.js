import axios from './axios_config.js';

export const get_pedidos = () => axios.get('/pedidos/get_documentos');

export const insertar_pedido = (body) => axios.post('/pedidos/insertar_documento', body);
export const insertar_producto = (id, body) => axios.post(`/pedidos/insertar_subdocumento/${id}`, body);

export const actualizar_pedido = (id, body) => axios.put(`/pedidos/actualizar_documento/${id}`, body);
export const actualizar_producto = (id, id_subdoc, body) => axios.put(`/pedidos/actualizar_subdocumento/${id}/${id_subdoc}`, body);

export const eliminar_pedido = (id) => axios.delete(`/pedidos/eliminar_documento/${id}`);
export const eliminar_producto = (id, id_subdoc) => axios.delete(`/pedidos/eliminar_subdocumento/${id}/${id_subdoc}`);
