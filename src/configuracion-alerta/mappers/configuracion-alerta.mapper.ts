import { ConfiguracionAlertaEntity } from '../configuracion-alerta.entity';
import { ConfiguracionAlertaResponse } from '../interfaces/configuracion-alerta-response.interface';

export function configuracionAlertaMapper(entidad: ConfiguracionAlertaEntity): ConfiguracionAlertaResponse {
  return {
    id: entidad.id,
    tipoAlertaId: entidad.tipoAlertaId,
    tipoAlertaNombre: entidad.tipoAlerta?.nombre,
    tipoAlertaCodigo: entidad.tipoAlerta?.codigo,
    procesoId: entidad.procesoId,
    procesoNombre: entidad.proceso?.nombre,
    procesoCodigo: entidad.proceso?.codigo,
    recipienteId: entidad.recipienteId,
    recipienteNombre: entidad.recipiente?.nombre,
    nombre: entidad.nombre,
    templateMensaje: entidad.templateMensaje,
    condicionDisparo: entidad.condicionDisparo ?? undefined,
    tiempoEvaluacion: entidad.tiempoEvaluacion ?? undefined,
    umbralValor: entidad.umbralValor ?? undefined,
    activo: entidad.activo === 'S',
    fechaCreacion: entidad.fechaCreacion,
  };
}
