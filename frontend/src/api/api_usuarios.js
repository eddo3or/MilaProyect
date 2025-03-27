import axios from './axios_config.js';

export const get_usuarios = () => axios.get('/usuarios/get_documentos');
export const insertar_usuario = () => axios.post('/usuarios/insertar_documento');
export const iniciar_sesion = (body) => axios.post('/usuarios/iniciar_sesion', body);
export const registrar_usuario = () => axios.post('/usuarios/registrar_usuario');
export const actualizar_usuario = () => axios.put(`/usuarios/actualizar_documento/${id}`);
export const eliminar_usuario = () => axios.delete(`/usuarios/eliminar_documento/${id}`);
