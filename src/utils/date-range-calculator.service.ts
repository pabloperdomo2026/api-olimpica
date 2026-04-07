import { Injectable } from '@nestjs/common';

export interface DateRangeParams {
  fechaInicio?: string;
  fechaFin?: string;
  deltaInicio?: number;
  deltaFin?: number;
  diaInicial?: number;
  diaFinal?: number;
  numSemanasUmbral?: number;
}

export interface DateRange {
  fechaInicio: string; // Formato: YYYY-MM-DD HH:mm:ss
  fechaFin: string;    // Formato: YYYY-MM-DD HH:mm:ss
}

@Injectable()
export class DateRangeCalculatorService {
  private readonly TIMEZONE = 'America/Bogota';
  private readonly DEFAULT_DELTA_INICIO = 4;
  private readonly DEFAULT_DELTA_FIN = 0;

  calculateDateRange(params: DateRangeParams): DateRange {
    const now = new Date();

    const fechaInicio = this.calculateStartDate(params, now);
    const fechaFin = this.calculateEndDate(params, now);

    return {
      fechaInicio: this.formatearFecha(fechaInicio),
      fechaFin: this.formatearFecha(fechaFin),
    };
  }

  private calculateStartDate(params: DateRangeParams, now: Date): Date {
    // 1. Explícito: Si fechaInicio viene en el DTO → usar directamente
    if (params.fechaInicio) {
      return new Date(params.fechaInicio);
    }

    // 2. Delta: Si deltaInicio existe → restar días desde hoy y redondear a 00:00
    if (params.deltaInicio !== undefined) {
      return this.calculateWithDelta(now, params.deltaInicio);
    }

    // 3. Día de semana con umbral: Si diaInicial + numSemanasUmbral existen → aplicar lógica
    if (params.diaInicial !== undefined && params.numSemanasUmbral !== undefined) {
      return this.calculateWithDayOfMonth(params.diaInicial, params.numSemanasUmbral, now);
    }

    // 4. Fallback: deltaInicio=4
    return this.calculateWithDelta(now, this.DEFAULT_DELTA_INICIO);
  }

  private calculateEndDate(params: DateRangeParams, now: Date): Date {
    // 1. Explícito: Si fechaFin viene en el DTO → usar directamente
    if (params.fechaFin) {
      return new Date(params.fechaFin);
    }

    // 2. Delta: Si deltaFin existe → restar días desde hoy y redondear a 00:00
    if (params.deltaFin !== undefined) {
      const date = this.calculateWithDelta(now, params.deltaFin);
      return this.clipToToday(date, now);
    }

    // 3. Día de semana con umbral: Si diaFinal + numSemanasUmbral existen → aplicar lógica
    if (params.diaFinal !== undefined && params.numSemanasUmbral !== undefined) {
      const date = this.calculateWithDayOfMonth(params.diaFinal, params.numSemanasUmbral, now);
      return this.clipToToday(date, now);
    }

    // 4. Fallback: deltaFin=0
    const date = this.calculateWithDelta(now, this.DEFAULT_DELTA_FIN);
    return this.clipToToday(date, now);
  }

  private calculateWithDelta(baseDate: Date, delta: number): Date {
    const result = new Date(baseDate);
    result.setDate(result.getDate() - delta);
    return this.setStartOfDay(result);
  }

  private calculateWithDayOfMonth(dayOfMonth: number, threshold: number, now: Date): Date {
    // 1. Obtener día actual de la semana y calcular qué semana del mes es
    const weekOfMonth = this.getWeekOfMonth(now);

    // 2. Determinar si usar mes anterior o actual
    const useCurrentMonth = weekOfMonth >= threshold;

    // 3. Calcular el mes y año objetivo
    let targetMonth = now.getMonth();
    let targetYear = now.getFullYear();

    if (!useCurrentMonth) {
      targetMonth -= 1;
      if (targetMonth < 0) {
        targetMonth = 11; // Diciembre
        targetYear -= 1;
      }
    }

    // 4. Validar y ajustar el día del mes (edge case: día 32, Febrero 29)
    const daysInTargetMonth = this.getDaysInMonth(targetYear, targetMonth);
    const validDay = Math.min(dayOfMonth, daysInTargetMonth);

    // 5. Crear la fecha y establecer a 00:00:00
    const result = new Date(targetYear, targetMonth, validDay);
    return this.setStartOfDay(result);
  }

  private getWeekOfMonth(date: Date): number {
    const dayOfMonth = date.getDate();
    return Math.ceil(dayOfMonth / 7);
  }

  private setStartOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  private clipToToday(date: Date, now: Date): Date {
    const startOfToday = this.setStartOfDay(now);
    if (date > startOfToday) {
      return startOfToday;
    }
    return date;
  }

  private getDaysInMonth(year: number, month: number): number {
    // month es 0-indexed (0 = Enero, 1 = Febrero, etc.)
    // El día 0 del mes siguiente es el último día del mes actual
    return new Date(year, month + 1, 0).getDate();
  }

  formatearFecha(fecha: Date): string {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const hora = String(fecha.getHours()).padStart(2, '0');
    const minuto = String(fecha.getMinutes()).padStart(2, '0');
    const segundo = String(fecha.getSeconds()).padStart(2, '0');
    return `${anio}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
  }
}
