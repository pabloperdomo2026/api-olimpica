import { UsuarioResponse } from "../interfaces/usuario-response.interface";
import { UsuarioEntity } from "../usuario.entity";

export const listartUsuariosMapper = (usuarios: UsuarioEntity[]): UsuarioResponse[] => {
  return usuarios.map((usuario) => {
    return {
      id: usuario.id,
      organizacionId: usuario.organizacionId,
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      fechaCreacion: usuario.fechaCreacion,
    }
  });
};