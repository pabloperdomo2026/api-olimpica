// import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
// import { usuariosDb, simulateDbDelay } from './usuarios.data';

// export interface EliminarUsuarioResponse {
//   mensaje: string;
//   usuarioId: number;
// }

// @Injectable()
// export class EliminarUsuarioUseCase {
//   async execute(usuarioId: number): Promise<EliminarUsuarioResponse> {
//     try {
//       await simulateDbDelay();
//       console.log('[DB] SELECT * FROM smr_usuario WHERE usuario_id =', usuarioId);

//       const index = usuariosDb.findIndex((u) => u.usuarioId === usuarioId);

//       if (index === -1) {
//         throw new NotFoundException(`Usuario con id ${usuarioId} no encontrado`);
//       }

//       usuariosDb.splice(index, 1);
//       console.log('[DB] DELETE FROM smr_usuario WHERE usuario_id =', usuarioId);

//       return {
//         mensaje: `Usuario con id ${usuarioId} eliminado correctamente`,
//         usuarioId,
//       };
//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       console.error('[DB] Error al eliminar usuario:', error.message);
//       throw new InternalServerErrorException('Error al eliminar el usuario');
//     }
//   }
// }
