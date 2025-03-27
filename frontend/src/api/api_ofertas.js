import axios from './axios_config.js';

export const get_ofertas = () => axios.get('/ofertas/get_documentos');
export const insertar_oferta = (body) => axios.post('/ofertas/insertar_documento', body);
export const actualizar_oferta = (body) => axios.put(`/ofertas/actualizar_documento/${id}`, body);
export const eliminar_oferta = () => axios.delete(`/ofertas/eliminar_documento/${id}`);
