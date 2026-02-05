import { Usuario } from '../interfaces';

// Simulación de base de datos en memoria
export const usuariosDb: Usuario[] = [
  {
    usuarioId: 1,
    organizacionId: 1,
    email: 'admin@olimpica.com',
    passwordHash: '$2b$10$HashSimulado123',
    nombre: 'Carlos',
    apellido: 'Administrador',
    activo: true,
    fechaCreacion: new Date('2024-01-15'),
    fechaModificacion: new Date('2024-01-15'),
    usuarioCreacion: 'SYSTEM',
    usuarioModificacion: 'SYSTEM',
  },
  {
    usuarioId: 2,
    organizacionId: 1,
    email: 'operador@olimpica.com',
    passwordHash: '$2b$10$HashSimulado456',
    nombre: 'María',
    apellido: 'García',
    activo: true,
    fechaCreacion: new Date('2024-02-20'),
    fechaModificacion: new Date('2024-06-15'),
    usuarioCreacion: 'admin@olimpica.com',
    usuarioModificacion: 'admin@olimpica.com',
  },
  {
    usuarioId: 3,
    organizacionId: 1,
    email: 'analista@olimpica.com',
    passwordHash: '$2b$10$HashSimulado789',
    nombre: 'Juan',
    apellido: 'Pérez',
    activo: false,
    fechaCreacion: new Date('2024-03-10'),
    usuarioCreacion: 'admin@olimpica.com',
  },
];

export const simulateDbDelay = (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 50));
};

export const getNextId = (): number => {
  return Math.max(...usuariosDb.map((u) => u.usuarioId), 0) + 1;
};
