import axios from './axios_config.js';

export const get_usuarios = () => axios.get('/usuarios/get_documentos');
export const iniciar_sesion = (body) => axios.post('/usuarios/iniciar_sesion', body);
export const registrar_usuario = (body) => axios.post('/usuarios/registrar_usuario', body);
export const actualizar_usuario = () => axios.put(`/usuarios/actualizar_documento/${id}`);
export const cerrar_sesion = () => axios.put(`/usuarios/cerrar_sesion`);
export const eliminar_usuario = () => axios.delete(`/usuarios/eliminar_documento/${id}`);
