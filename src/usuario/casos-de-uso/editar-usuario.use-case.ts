// import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
// import { UsuarioResponse } from '../interfaces/usuario-response.interface';
// import { ActualizarUsuarioDto } from '../dtos';
// import { usuariosDb, simulateDbDelay } from './usuarios.data';

// @Injectable()
// export class EditarUsuarioUseCase {
//   async execute(
//     usuarioId: number,
//     dto: ActualizarUsuarioDto,
//     usuarioModificacion: string,
//   ): Promise<UsuarioResponse> {
//     try {
//       await simulateDbDelay();
//       console.log('[DB] SELECT * FROM smr_usuario WHERE usuario_id =', usuarioId);

//       const index = usuariosDb.findIndex((u) => u.usuarioId === usuarioId);

//       if (index === -1) {
//         throw new NotFoundException(`Usuario con id ${usuarioId} no encontrado`);
//       }

//       // Validar email único si se está actualizando
//       if (dto.email) {
//         const existeEmail = usuariosDb.find(
//           (u) => u.email.toLowerCase() === dto?.email?.toLowerCase() && u.usuarioId !== usuarioId,
//         );
//         if (existeEmail) {
//           throw new ConflictException(`El email ${dto.email} ya está registrado`);
//         }
//       }

//       const usuarioActual = usuariosDb[index];

//       // Simular hash si se actualiza password
//       let passwordHash = usuarioActual.passwordHash;
//       if (dto.password) {
//         passwordHash = `$2b$10$${Buffer.from(dto.password).toString('base64')}`;
//       }

//       const usuarioActualizado = {
//         ...usuarioActual,
//         email: dto.email || usuarioActual.email,
//         passwordHash,
//         nombre: dto.nombre || usuarioActual.nombre,
//         apellido: dto.apellido !== undefined ? dto.apellido : usuarioActual.apellido,
//         activo: dto.activo !== undefined ? dto.activo : usuarioActual.activo,
//         fechaModificacion: new Date(),
//         usuarioModificacion,
//       };

//       usuariosDb[index] = usuarioActualizado;
//       console.log('[DB] UPDATE smr_usuario SET ... WHERE usuario_id =', usuarioId);

//       return {
//         usuarioId: usuarioActualizado.usuarioId,
//         organizacionId: usuarioActualizado.organizacionId,
//         email: usuarioActualizado.email,
//         nombre: usuarioActualizado.nombre,
//         apellido: usuarioActualizado.apellido,
//         activo: usuarioActualizado.activo,
//         fechaCreacion: usuarioActualizado.fechaCreacion,
//         fechaModificacion: usuarioActualizado.fechaModificacion,
//       };
//     } catch (error) {
//       if (error instanceof NotFoundException || error instanceof ConflictException) {
//         throw error;
//       }
//       console.error('[DB] Error al editar usuario:', error.message);
//       throw new InternalServerErrorException('Error al editar el usuario');
//     }
//   }
// }
