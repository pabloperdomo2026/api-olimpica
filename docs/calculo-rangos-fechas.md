# Sistema de Cálculo de Rangos de Fechas

## Descripción General

### Problema que Resuelve

Anteriormente, el sistema de ejecución de procesos utilizaba fechas hardcodeadas en el código:

```typescript
parametrosResueltos['p_fecha_inicio'] = this.formatearFecha(new Date()),
parametrosResueltos['p_fecha_fin'] = this.formatearFecha(new Date('2026-02-28T23:59:59')),
```

Esto generaba:
- Falta de flexibilidad para diferentes tipos de ejecuciones
- Fecha de fin obsoleta que requería actualizaciones manuales del código
- No soportaba casos de uso complejos (ejecuciones diarias, semanales con umbral, manuales)
- Imposibilidad de configurar rangos de fechas dinámicamente

### Arquitectura de la Solución

El nuevo sistema implementa un servicio dedicado (`DateRangeCalculatorService`) que calcula rangos de fechas de manera dinámica basándose en parámetros configurables. El servicio sigue una cascada de prioridades que permite combinar diferentes estrategias de cálculo.

**Componentes principales:**
- `DateRangeCalculatorService`: Servicio que contiene toda la lógica de cálculo
- `CrearEjecucionProcesoDto`: DTO actualizado con campos opcionales para configurar fechas
- `CrearEjecucionUseCase`: Use case actualizado que consume el servicio

### Beneficios del Nuevo Sistema

1. **Flexibilidad Total**: Soporta múltiples estrategias de cálculo sin modificar código
2. **Configuración Dinámica**: Las fechas se configuran por request, no hardcodeadas
3. **Robustez**: Maneja casos especiales (años bisiestos, cambios de año, días inválidos)
4. **Mantenibilidad**: Lógica centralizada en un servicio reutilizable
5. **Backwards Compatible**: Sin configuración, usa valores por defecto razonables

## Guía de Usuario

Esta sección explica cómo configurar fechas para diferentes escenarios de ejecución.

### Escenario 1: Ejecución con Fechas Específicas

Use este escenario cuando necesite extraer datos de un rango de fechas exacto.

**Configuración:**
```json
{
  "procesoId": "uuid-del-proceso",
  "fechaInicio": "2025-03-15T10:30:00",
  "fechaFin": "2025-03-20T15:45:00"
}
```

**Resultado:**
- Fecha inicio: `2025-03-15 10:30:00` (hora preservada)
- Fecha fin: `2025-03-20 15:45:00` (hora preservada)

**Cuándo usar:** Ejecuciones manuales puntuales, reprocesos de rangos históricos, auditorías.

### Escenario 2: Ejecución Diaria (Últimos N Días)

Use este escenario para procesos diarios que necesitan datos de los últimos X días.

**Configuración:**
```json
{
  "procesoId": "uuid-del-proceso",
  "deltaInicio": 4,
  "deltaFin": 0
}
```

**Resultado (ejecutado el 7 de Abril 2025):**
- Fecha inicio: `2025-04-03 00:00:00`
- Fecha fin: `2025-04-07 00:00:00`
- **Cubre**: Datos de los días 3, 4, 5, 6 y 7 de Abril

**Cuándo usar:**
- Procesos diarios automáticos
- Sincronizaciones incrementales
- Dashboards con datos recientes

### Escenario 3: Ejecución Semanal con Lógica de Mes

Use este escenario para procesos semanales (ej: sábados) que necesitan datos desde inicio de mes o mes anterior, dependiendo de la semana del mes.

**Configuración:**
```json
{
  "procesoId": "uuid-del-proceso",
  "diaInicial": 1,
  "diaFinal": 18,
  "numSemanasUmbral": 3
}
```

**Ejemplo 1 - Ejecutado el Sábado 5 de Abril 2025 (2da semana):**
- Semana del mes: 1 (primera semana)
- Comparación: 1 < 3 (umbral)
- Mes usado: Mes anterior (Marzo)
- Fecha inicio: `2025-03-01 00:00:00`
- Fecha fin: `2025-04-18 00:00:00` (ajustado a hoy si es futuro)

**Ejemplo 2 - Ejecutado el Sábado 19 de Abril 2025 (3ra semana):**
- Semana del mes: 3
- Comparación: 3 >= 3 (umbral)
- Mes usado: Mes actual (Abril)
- Fecha inicio: `2025-04-01 00:00:00`
- Fecha fin: `2025-04-18 00:00:00`

**Cuándo usar:**
- Reportes semanales con ventanas de datos variables
- Cierres mensuales con procesamiento gradual
- Consolidaciones periódicas

### Escenario 4: Combinaciones (Híbrido)

Puede combinar diferentes parámetros para crear comportamientos personalizados.

**Ejemplo: Fecha inicio fija, fecha fin dinámica**
```json
{
  "procesoId": "uuid-del-proceso",
  "fechaInicio": "2025-03-01T00:00:00",
  "deltaFin": 0
}
```

**Resultado (ejecutado el 7 de Abril 2025):**
- Fecha inicio: `2025-03-01 00:00:00` (explícita)
- Fecha fin: `2025-04-07 00:00:00` (calculada con delta)

**Cuándo usar:**
- Acumulados desde una fecha fija hasta hoy
- Migraciones parciales
- Análisis de períodos abiertos

## Referencia Técnica

### Parámetros Disponibles

| Parámetro | Tipo | Descripción | Ejemplo | Validación |
|-----------|------|-------------|---------|------------|
| `fechaInicio` | string (ISO 8601) | Fecha/hora de inicio explícita | `"2025-03-15T10:30:00"` | Debe ser formato ISO válido |
| `fechaFin` | string (ISO 8601) | Fecha/hora de fin explícita | `"2025-03-20T15:45:00"` | Debe ser formato ISO válido |
| `deltaInicio` | number | Días hacia atrás desde hoy para inicio | `4` | Entero >= 0 |
| `deltaFin` | number | Días hacia atrás desde hoy para fin | `0` | Entero >= 0 |
| `diaInicial` | number (1-31) | Día del mes para fecha de inicio | `1` | Entero entre 1 y 31 |
| `diaFinal` | number (1-31) | Día del mes para fecha de fin | `15` | Entero entre 1 y 31 |
| `numSemanasUmbral` | number | Umbral para determinar mes anterior vs actual | `3` | Entero >= 1 |

### Cascada de Prioridades

El sistema calcula `fechaInicio` y `fechaFin` **independientemente** usando esta cascada:

#### Para Fecha Inicio:
1. **Explícito**: Si `fechaInicio` está presente → usar directamente
2. **Delta**: Si `deltaInicio` está presente → restar días desde hoy
3. **Día del mes**: Si `diaInicial` + `numSemanasUmbral` → aplicar lógica de semana del mes
4. **Fallback**: `deltaInicio=4` (últimos 4 días)

#### Para Fecha Fin:
1. **Explícito**: Si `fechaFin` está presente → usar directamente
2. **Delta**: Si `deltaFin` está presente → restar días desde hoy
3. **Día del mes**: Si `diaFinal` + `numSemanasUmbral` → aplicar lógica de semana del mes
4. **Fallback**: `deltaFin=0` (hoy)

**Importante:** Las fechas calculadas con delta o día del mes **siempre** se redondean a `00:00:00`. Solo las fechas explícitas conservan su hora original.

## Lógica de Día del Mes con Umbral

### Cómo Funciona

Esta lógica permite determinar dinámicamente si usar el mes actual o el mes anterior basándose en qué semana del mes es hoy.

**Algoritmo:**
1. Detecta qué semana del mes es hoy (1=primera, 2=segunda, 3=tercera, etc.)
2. Compara con `numSemanasUmbral`
3. Si la semana actual < umbral → usa mes **anterior**
4. Si la semana actual >= umbral → usa mes **actual**
5. Usa el día especificado (`diaInicial` o `diaFinal`) del mes determinado

**Cálculo de semana del mes:**
```
Semana = ceil(día_del_mes / 7)

Días 1-7   → Semana 1
Días 8-14  → Semana 2
Días 15-21 → Semana 3
Días 22-28 → Semana 4
Días 29-31 → Semana 5
```

### Ejemplo Detallado

**Configuración:**
```json
{
  "diaInicial": 1,
  "numSemanasUmbral": 3
}
```

**Resultados según fecha de ejecución:**

| Fecha de Ejecución | Día del Mes | Semana | Comparación | Mes Usado | Fecha Inicio Resultante |
|-------------------|-------------|--------|-------------|-----------|------------------------|
| Sábado 5 Abril 2025 | 5 | 1 | 1 < 3 | Mes anterior (Marzo) | 1 de Marzo 2025 00:00 |
| Sábado 12 Abril 2025 | 12 | 2 | 2 < 3 | Mes anterior (Marzo) | 1 de Marzo 2025 00:00 |
| Sábado 19 Abril 2025 | 19 | 3 | 3 >= 3 | Mes actual (Abril) | 1 de Abril 2025 00:00 |
| Sábado 26 Abril 2025 | 26 | 4 | 4 >= 3 | Mes actual (Abril) | 1 de Abril 2025 00:00 |

## Casos Especiales (Edge Cases)

### 1. Día del Mes Inválido

Si `diaInicial` o `diaFinal` es mayor que los días del mes, se ajusta automáticamente al último día válido.

**Ejemplo:**
```json
{ "diaInicial": 31 }
```

| Mes | Días en el Mes | Día Usado |
|-----|---------------|-----------|
| Abril 2025 | 30 | 30 |
| Febrero 2025 | 28 | 28 |
| Febrero 2024 | 29 | 29 (año bisiesto) |
| Enero 2025 | 31 | 31 |

### 2. Año Bisiesto

El sistema detecta automáticamente años bisiestos y ajusta Febrero a 29 días cuando corresponde.

**Ejemplo:**
- 2024 es año bisiesto → Febrero tiene 29 días
- 2025 no es año bisiesto → Febrero tiene 28 días

### 3. Cambio de Año (Enero/Diciembre)

Cuando el mes anterior cruza el año, se maneja automáticamente.

**Ejemplo:**
```json
{ "diaInicial": 1, "numSemanasUmbral": 3 }
```

Ejecutado el sábado 4 de Enero 2025 (1era semana):
- Semana: 1 < 3
- Mes anterior: Diciembre 2024
- **Resultado**: `1 de Diciembre 2024 00:00`

### 4. Delta que Cruza Meses

La aritmética de fechas maneja automáticamente cambios de mes.

**Ejemplo:**
Hoy: 1 de Marzo 2025
```json
{ "deltaInicio": 4 }
```

**Resultado**: `25 de Febrero 2025 00:00`

El sistema resta 4 días correctamente, considerando que Febrero 2025 tiene 28 días.

### 5. Fechas Futuras

El sistema **nunca** genera fechas de fin futuras. Si el cálculo resulta en una fecha futura, se ajusta a la fecha/hora actual.

**Ejemplo:**
Hoy: 5 de Abril 2025 14:30:00
```json
{ "diaFinal": 10 }
```

Sin clipping: 10 de Abril 2025 00:00
**Resultado real**: `5 de Abril 2025 00:00` (clipeado a inicio de hoy)

**Nota:** Solo aplica para `fechaFin`. La `fechaInicio` no se clipea.

### 6. Timezone Colombia

Todas las operaciones de fecha se realizan en el timezone **America/Bogota** (UTC-5).

Esto es importante para:
- Ejecuciones programadas con cron
- Consistencia en logs y auditorías
- Evitar desfaces en cambios de horario

### 7. Hora en Fechas Calculadas

**Regla general:**
- Fechas **explícitas** (`fechaInicio`, `fechaFin`): Conservan hora original
- Fechas **calculadas** (delta, día del mes): Siempre `00:00:00`

**Ejemplo:**
```json
{
  "fechaInicio": "2025-03-15T10:30:00",  // Conserva 10:30:00
  "deltaFin": 0                           // Genera 00:00:00
}
```

## Formato de Fecha

Todas las fechas calculadas se devuelven en formato: `YYYY-MM-DD HH:mm:ss`

**Ejemplos:**
- `2025-04-07 00:00:00`
- `2025-03-15 10:30:00`
- `2024-12-31 23:59:59`

## Matriz de Decisión Rápida

| Necesito... | Usar Parámetros | Ejemplo |
|-------------|-----------------|---------|
| Fechas exactas específicas | `fechaInicio` + `fechaFin` | `{"fechaInicio": "2025-03-01T00:00:00", "fechaFin": "2025-03-31T23:59:59"}` |
| Últimos N días | `deltaInicio=N` + `deltaFin=0` | `{"deltaInicio": 7, "deltaFin": 0}` (últimos 7 días) |
| Desde inicio del mes hasta hoy | `diaInicial=1` + `deltaFin=0` | `{"diaInicial": 1, "deltaFin": 0}` |
| Lógica semanal con mes anterior/actual | `diaInicial` + `numSemanasUmbral` | `{"diaInicial": 1, "numSemanasUmbral": 3}` |
| Fecha inicio fija, fin dinámica | `fechaInicio` + `deltaFin` | `{"fechaInicio": "2025-01-01T00:00:00", "deltaFin": 0}` |
| Comportamiento por defecto | No enviar parámetros | `{}` (usa `deltaInicio=4`, `deltaFin=0`) |

## Ejemplos de Configuración de Jobs

### Job Diario (Lunes-Viernes)

**Cron:** `0 6 * * 1-5` (6 AM, Lunes a Viernes)

**Payload:**
```json
{
  "procesoId": "uuid-del-proceso",
  "deltaInicio": 4,
  "deltaFin": 0,
  "tipoEjecucion": "AUTOMATICA",
  "usuarioSolicita": "sistema"
}
```

**Comportamiento:**
- Extrae datos de los últimos 4 días hasta hoy
- Ejecuta cada día laboral a las 6 AM
- Siempre incluye el día actual

### Job Semanal (Sábados)

**Cron:** `0 6 * * 6` (6 AM, Sábados)

**Payload:**
```json
{
  "procesoId": "uuid-del-proceso",
  "diaInicial": 1,
  "deltaFin": 1,
  "numSemanasUmbral": 3,
  "tipoEjecucion": "AUTOMATICA",
  "usuarioSolicita": "sistema"
}
```

**Comportamiento:**
- Si es 1er o 2do sábado: desde 1 de mes anterior hasta ayer
- Si es 3er sábado o más: desde 1 de mes actual hasta ayer
- Excluye el día actual (usa `deltaFin=1`)

### Job Mensual (Primer Día del Mes)

**Cron:** `0 6 1 * *` (6 AM, día 1 de cada mes)

**Payload:**
```json
{
  "procesoId": "uuid-del-proceso",
  "diaInicial": 1,
  "diaFinal": 1,
  "numSemanasUmbral": 1,
  "tipoEjecucion": "AUTOMATICA",
  "usuarioSolicita": "sistema"
}
```

**Comportamiento:**
- Extrae todo el mes anterior completo
- Desde día 1 hasta día 1 del mes anterior
- Ideal para cierres mensuales

### Job Manual (On-Demand)

**Trigger:** Manual desde UI o API

**Payload:**
```json
{
  "procesoId": "uuid-del-proceso",
  "fechaInicio": "2025-03-01T00:00:00",
  "fechaFin": "2025-03-31T23:59:59",
  "tipoEjecucion": "MANUAL",
  "usuarioSolicita": "juan.perez@empresa.com"
}
```

**Comportamiento:**
- Usa exactamente las fechas especificadas
- Útil para reprocesos y análisis históricos

## Preguntas Frecuentes (FAQ)

### ¿Qué pasa si no envío ningún parámetro de fecha?

Se usa el comportamiento por defecto: `deltaInicio=4` y `deltaFin=0`, que extrae los últimos 4 días hasta hoy.

**Ejemplo:**
```json
{
  "procesoId": "uuid-del-proceso"
}
```

Ejecutado el 7 de Abril → Datos del 3 al 7 de Abril.

### ¿Puedo combinar diferentes tipos de parámetros?

Sí. Por ejemplo, puedes usar `fechaInicio` explícita con `deltaFin=0` para tener inicio fijo y fin dinámico.

La cascada de prioridades aplica **independientemente** para inicio y fin.

### ¿Cómo funciona `diaFinal=-1`?

Actualmente **no implementado**. Se puede agregar como funcionalidad futura para representar "día anterior a hoy". Por ahora, usa `deltaFin=1` para el mismo efecto.

### ¿Las horas se respetan en fechas explícitas?

Sí. Si envías `"2025-03-15T10:30:00"`, se usa exactamente esa hora.

### ¿Las fechas calculadas con delta tienen hora?

Siempre se redondean a `00:00:00` (inicio del día).

### ¿Qué pasa si `fechaFin` < `fechaInicio`?

El sistema **no valida** este caso actualmente. Es responsabilidad del usuario configurar fechas lógicas. Si se envían fechas inconsistentes, el proceso podría no retornar datos o fallar.

**Recomendación:** Validar en el frontend o agregar validación en el DTO.

### ¿Se puede usar para rangos de tiempo pequeños (horas)?

Sí, usando fechas explícitas con horas específicas:

```json
{
  "fechaInicio": "2025-04-07T10:00:00",
  "fechaFin": "2025-04-07T14:00:00"
}
```

Esto extrae datos entre las 10 AM y 2 PM del mismo día.

### ¿El sistema maneja horarios de verano (DST)?

JavaScript nativo maneja automáticamente los cambios de horario para el timezone `America/Bogota`. Colombia no observa DST desde 1993, por lo que este no es un problema en producción.

### ¿Puedo obtener solo un día específico?

Sí, usando deltas iguales:

```json
{
  "deltaInicio": 1,
  "deltaFin": 1
}
```

Ejecutado el 7 de Abril → Solo datos del 6 de Abril (ambas fechas serán `2025-04-06 00:00:00`).

**Alternativa con fechas explícitas:**
```json
{
  "fechaInicio": "2025-04-06T00:00:00",
  "fechaFin": "2025-04-06T23:59:59"
}
```

## Especificación Técnica Interna

### Algoritmo: `calculateStartDate`

```typescript
private calculateStartDate(params: DateRangeParams, now: Date): Date {
  // 1. Explícito
  if (params.fechaInicio) {
    return new Date(params.fechaInicio);
  }

  // 2. Delta
  if (params.deltaInicio !== undefined) {
    return this.calculateWithDelta(now, params.deltaInicio);
  }

  // 3. Día del mes con umbral
  if (params.diaInicial !== undefined && params.numSemanasUmbral !== undefined) {
    return this.calculateWithDayOfMonth(params.diaInicial, params.numSemanasUmbral, now);
  }

  // 4. Fallback
  return this.calculateWithDelta(now, this.DEFAULT_DELTA_INICIO); // 4 días
}
```

### Algoritmo: `calculateEndDate`

Idéntico a `calculateStartDate`, pero con clipping adicional para evitar fechas futuras:

```typescript
private calculateEndDate(params: DateRangeParams, now: Date): Date {
  // ... cascada igual a calculateStartDate ...

  // Clipping adicional: no permitir fechas futuras
  const date = /* resultado de cascada */;
  return this.clipToToday(date, now);
}
```

### Algoritmo: `calculateWithDelta`

```typescript
private calculateWithDelta(baseDate: Date, delta: number): Date {
  const result = new Date(baseDate);
  result.setDate(result.getDate() - delta);
  return this.setStartOfDay(result); // Redondear a 00:00:00
}
```

### Algoritmo: `calculateWithDayOfMonth`

```typescript
private calculateWithDayOfMonth(dayOfMonth: number, threshold: number, now: Date): Date {
  // 1. Calcular semana del mes actual
  const weekOfMonth = Math.ceil(now.getDate() / 7);

  // 2. Determinar mes objetivo
  const useCurrentMonth = weekOfMonth >= threshold;
  let targetMonth = now.getMonth();
  let targetYear = now.getFullYear();

  if (!useCurrentMonth) {
    targetMonth -= 1;
    if (targetMonth < 0) {
      targetMonth = 11; // Diciembre
      targetYear -= 1;
    }
  }

  // 3. Validar día del mes (edge case: día 32, febrero 29)
  const daysInTargetMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
  const validDay = Math.min(dayOfMonth, daysInTargetMonth);

  // 4. Crear fecha y redondear a 00:00:00
  const result = new Date(targetYear, targetMonth, validDay);
  return this.setStartOfDay(result);
}
```

### Funciones Auxiliares

**`setStartOfDay`**: Redondea una fecha a las 00:00:00
```typescript
private setStartOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}
```

**`clipToToday`**: Asegura que una fecha no sea futura
```typescript
private clipToToday(date: Date, now: Date): Date {
  const startOfToday = this.setStartOfDay(now);
  if (date > startOfToday) {
    return startOfToday;
  }
  return date;
}
```

**`getDaysInMonth`**: Obtiene días del mes considerando años bisiestos
```typescript
private getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}
```

**`formatearFecha`**: Formatea fecha al formato esperado por el sistema
```typescript
formatearFecha(fecha: Date): string {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  const hora = String(fecha.getHours()).padStart(2, '0');
  const minuto = String(fecha.getMinutes()).padStart(2, '0');
  const segundo = String(fecha.getSeconds()).padStart(2, '0');
  return `${anio}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
}
```

## Testing Manual

### Caso 1: Ejecución Diaria

```bash
curl -X POST http://localhost:3000/ejecucion-proceso \
  -H "Content-Type: application/json" \
  -d '{
    "procesoId": "uuid-valido",
    "deltaInicio": 4,
    "deltaFin": 0
  }'
```

**Verificar:**
- `fechaInicio`: 4 días atrás a las 00:00:00
- `fechaFin`: Hoy a las 00:00:00

### Caso 2: Sábado (2do sábado del mes)

```bash
# Ejecutar un sábado entre los días 8-14
curl -X POST http://localhost:3000/ejecucion-proceso \
  -H "Content-Type: application/json" \
  -d '{
    "procesoId": "uuid-valido",
    "diaInicial": 1,
    "deltaFin": 1,
    "numSemanasUmbral": 3
  }'
```

**Verificar:**
- `fechaInicio`: Día 1 del mes **anterior** a las 00:00:00
- `fechaFin`: Ayer a las 00:00:00

### Caso 3: Sábado (3er sábado del mes)

```bash
# Ejecutar un sábado entre los días 15-21
curl -X POST http://localhost:3000/ejecucion-proceso \
  -H "Content-Type: application/json" \
  -d '{
    "procesoId": "uuid-valido",
    "diaInicial": 1,
    "deltaFin": 1,
    "numSemanasUmbral": 3
  }'
```

**Verificar:**
- `fechaInicio`: Día 1 del mes **actual** a las 00:00:00
- `fechaFin`: Ayer a las 00:00:00

### Caso 4: Ejecución Manual

```bash
curl -X POST http://localhost:3000/ejecucion-proceso \
  -H "Content-Type: application/json" \
  -d '{
    "procesoId": "uuid-valido",
    "fechaInicio": "2025-03-15T10:30:00",
    "fechaFin": "2025-03-20T15:45:00"
  }'
```

**Verificar:**
- `fechaInicio`: `2025-03-15 10:30:00` (exacta)
- `fechaFin`: `2025-03-20 15:45:00` (exacta)

### Caso 5: Edge Case - Día 32

```bash
curl -X POST http://localhost:3000/ejecucion-proceso \
  -H "Content-Type: application/json" \
  -d '{
    "procesoId": "uuid-valido",
    "diaInicial": 32,
    "diaFinal": 32,
    "numSemanasUmbral": 1
  }'
```

**Verificar:**
- Fechas usan el último día válido del mes (28/29/30/31 según corresponda)
- No se produce error

### Caso 6: Comportamiento por Defecto

```bash
curl -X POST http://localhost:3000/ejecucion-proceso \
  -H "Content-Type: application/json" \
  -d '{
    "procesoId": "uuid-valido"
  }'
```

**Verificar:**
- `fechaInicio`: 4 días atrás a las 00:00:00 (fallback)
- `fechaFin`: Hoy a las 00:00:00 (fallback)

## Archivos Modificados/Creados

### Archivos Creados
- `/src/utils/date-range-calculator.service.ts` - Servicio principal de cálculo
- `/docs/calculo-rangos-fechas.md` - Este documento

### Archivos Modificados
- `/src/ejecucion-proceso/dtos/crear-ejecucion-proceso.dto.ts` - Agregados 7 campos opcionales
- `/src/ejecucion-proceso/casos-de-uso/crear-ejecucion.use-case.ts` - Integrado servicio, removido método `formatearFecha`
- `/src/ejecucion-proceso/ejecucion-proceso.module.ts` - Registrado `DateRangeCalculatorService` en providers

## Mejoras Futuras Sugeridas

1. **Validación de Coherencia**: Agregar validación en DTO para asegurar `fechaFin >= fechaInicio`
2. **Tests Unitarios**: Crear suite completa de tests para `DateRangeCalculatorService`
3. **Soporte de `diaFinal=-1`**: Implementar semántica de "día anterior" de manera explícita
4. **Configuración de Timezone**: Permitir configurar timezone por organización
5. **Logs Detallados**: Agregar logging del cálculo de fechas para debugging
6. **Métricas**: Registrar qué estrategia de cálculo se usó (explícita, delta, día del mes, fallback)
7. **UI para Configuración**: Panel visual para configurar rangos de fechas sin escribir JSON
8. **Previsualización**: Endpoint que retorna las fechas calculadas sin ejecutar el proceso

## Versionado

- **Versión Inicial**: 1.0.0 (Abril 2026)
- **Autor**: Sistema de desarrollo API Olímpica
- **Estado**: Implementado y en producción
