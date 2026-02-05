import { UsuarioResponse } from "../interfaces/usuario-response.interface";
import { UsuarioEntity } from "../usuario.entity";

export const crearUsuarioMapper = (usuario: UsuarioEntity): UsuarioResponse => {
  return {
    id: usuario.id,
    organizacionId: usuario.organizacionId,
    email: usuario.email,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    fechaCreacion: usuario.fechaCreacion,
  };
};