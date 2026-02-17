import { CalendarioResponse } from '../interfaces/calendario-response.interface';
import { CalendarioEntity } from '../calendario.entity';

export const listarCalendariosMapper = (calendarios: CalendarioEntity[]): CalendarioResponse[] => {
  return calendarios.map((c) => calendarioMapper(c));
};

export const calendarioMapper = (c: CalendarioEntity): CalendarioResponse => ({
  fechaId: c.fechaId,
  pais: c.pais,
  fecha: c.fecha,
  anio: c.anio,
  mes: c.mes,
  dia: c.dia,
  esFinSemana: c.esFinSemana === 'S',
  esFestivo: c.esFestivo === 'S',
  esDiaLaboral: c.esDiaLaboral === 'S',
  organizacionId: c.organizacionId,
  fechaCreacion: c.fechaCreacion,
  fechaModificacion: c.fechaModificacion,
});
