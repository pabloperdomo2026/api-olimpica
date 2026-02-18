-- =============================================================================
-- CARGA CALENDARIO 2026 - COLOMBIA
-- Tabla: smr_dm_dim_fecha
-- Motor: PostgreSQL
-- Descripcion: Genera los 365 dias del año 2026 con identificacion de
--              dias habiles, festivos colombianos y fines de semana.
--
-- Festivos Colombia 2026 (Ley 51/1983 - Ley Emiliani):
--   Fijos (no se trasladan):
--     01-Ene  Año Nuevo
--     01-May  Dia del Trabajo
--     20-Jul  Dia de la Independencia
--     07-Ago  Batalla de Boyaca
--     08-Dic  Inmaculada Concepcion
--     25-Dic  Navidad
--
--   Trasladados al lunes siguiente si no caen en lunes:
--     12-Ene  Reyes Magos        (orig 06-Ene, martes -> lunes 12-Ene)
--     23-Mar  San Jose           (orig 19-Mar, jueves -> lunes 23-Mar)
--     18-May  Ascension          (orig 14-May, jueves -> lunes 18-May)
--     08-Jun  Corpus Christi     (orig 04-Jun, jueves -> lunes 08-Jun)
--     15-Jun  Sagrado Corazon    (orig 12-Jun, viernes -> lunes 15-Jun)
--     29-Jun  San Pedro y Pablo  (orig 29-Jun, ya es lunes)
--     17-Ago  Asuncion Virgen    (orig 15-Ago, sabado -> lunes 17-Ago)
--     12-Oct  Dia de la Raza     (orig 12-Oct, ya es lunes)
--     02-Nov  Todos los Santos   (orig 01-Nov, domingo -> lunes 02-Nov)
--     16-Nov  Ind. Cartagena     (orig 11-Nov, miercoles -> lunes 16-Nov)
--
--   Semana Santa (calculados sobre Pascua = 05-Abr-2026):
--     02-Abr  Jueves Santo
--     03-Abr  Viernes Santo
--
-- Total festivos 2026: 18
-- Dias habiles 2026: 365 - 105 fines de semana - 18 festivos entre semana = ~242
--
-- Uso:
--   psql -h localhost -p 5432 -U postgres -d scanntech -f carga_calendario_2026.sql
--
-- Nota: Usa ON CONFLICT DO NOTHING para ser idempotente (puede ejecutarse
--       multiples veces sin duplicar datos).
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- Festivos Colombia 2026
-- -----------------------------------------------------------------------------
WITH festivos_2026 AS (
    SELECT fecha::DATE, nombre_festivo FROM (VALUES
        ('2026-01-01', 'Año Nuevo'),
        ('2026-01-12', 'Dia de Reyes Magos'),          -- trasladado de 06-Ene
        ('2026-03-23', 'Dia de San Jose'),              -- trasladado de 19-Mar
        ('2026-04-02', 'Jueves Santo'),
        ('2026-04-03', 'Viernes Santo'),
        ('2026-05-01', 'Dia del Trabajo'),
        ('2026-05-18', 'Ascension del Senor'),          -- trasladado de 14-May
        ('2026-06-08', 'Corpus Christi'),               -- trasladado de 04-Jun
        ('2026-06-15', 'Sagrado Corazon de Jesus'),     -- trasladado de 12-Jun
        ('2026-06-29', 'San Pedro y San Pablo'),
        ('2026-07-20', 'Dia de la Independencia'),
        ('2026-08-07', 'Batalla de Boyaca'),
        ('2026-08-17', 'Asuncion de la Virgen'),        -- trasladado de 15-Ago
        ('2026-10-12', 'Dia de la Raza'),
        ('2026-11-02', 'Todos los Santos'),             -- trasladado de 01-Nov
        ('2026-11-16', 'Independencia de Cartagena'),   -- trasladado de 11-Nov
        ('2026-12-08', 'Inmaculada Concepcion'),
        ('2026-12-25', 'Navidad')
    ) AS t(fecha, nombre_festivo)
),

-- -----------------------------------------------------------------------------
-- Generar todos los dias del 2026
-- -----------------------------------------------------------------------------
dias_2026 AS (
    SELECT
        ('2026-01-01'::DATE + INTERVAL '1 day' * generate_series)::DATE AS fecha
    FROM generate_series(0, 364)   -- 365 dias: 0..364
),

-- -----------------------------------------------------------------------------
-- Combinar dias con festivos y calcular atributos
-- -----------------------------------------------------------------------------
calendario AS (
    SELECT
        d.fecha,
        -- fecha_key formato YYYYMMDD como entero
        TO_CHAR(d.fecha, 'YYYYMMDD')::NUMERIC                    AS fecha_key,
        EXTRACT(YEAR  FROM d.fecha)::NUMERIC                     AS anio,
        EXTRACT(MONTH FROM d.fecha)::NUMERIC                     AS mes,
        EXTRACT(DAY   FROM d.fecha)::NUMERIC                     AS dia,
        CEIL(EXTRACT(MONTH FROM d.fecha) / 3.0)::NUMERIC         AS trimestre,
        CEIL(EXTRACT(MONTH FROM d.fecha) / 6.0)::NUMERIC         AS semestre,
        EXTRACT(WEEK  FROM d.fecha)::NUMERIC                     AS numero_semana,
        -- DOW: 0=Domingo, 1=Lunes, ..., 6=Sabado
        EXTRACT(DOW   FROM d.fecha)::NUMERIC                     AS dia_semana,

        -- Nombre del dia en español
        CASE EXTRACT(DOW FROM d.fecha)
            WHEN 0 THEN 'Domingo'
            WHEN 1 THEN 'Lunes'
            WHEN 2 THEN 'Martes'
            WHEN 3 THEN 'Miercoles'
            WHEN 4 THEN 'Jueves'
            WHEN 5 THEN 'Viernes'
            WHEN 6 THEN 'Sabado'
        END                                                       AS nombre_dia_semana,

        -- Nombre del mes en español
        CASE EXTRACT(MONTH FROM d.fecha)
            WHEN  1 THEN 'Enero'
            WHEN  2 THEN 'Febrero'
            WHEN  3 THEN 'Marzo'
            WHEN  4 THEN 'Abril'
            WHEN  5 THEN 'Mayo'
            WHEN  6 THEN 'Junio'
            WHEN  7 THEN 'Julio'
            WHEN  8 THEN 'Agosto'
            WHEN  9 THEN 'Septiembre'
            WHEN 10 THEN 'Octubre'
            WHEN 11 THEN 'Noviembre'
            WHEN 12 THEN 'Diciembre'
        END                                                       AS nombre_mes,

        -- Nombre del trimestre
        CASE CEIL(EXTRACT(MONTH FROM d.fecha) / 3.0)
            WHEN 1 THEN 'Q1 - Primer Trimestre'
            WHEN 2 THEN 'Q2 - Segundo Trimestre'
            WHEN 3 THEN 'Q3 - Tercer Trimestre'
            WHEN 4 THEN 'Q4 - Cuarto Trimestre'
        END                                                       AS nombre_trimestre,

        -- Periodo YYYY-MM
        TO_CHAR(d.fecha, 'YYYY-MM')                              AS anio_mes,

        -- Periodo YYYY-Qn
        TO_CHAR(d.fecha, 'YYYY') || '-Q'
            || CEIL(EXTRACT(MONTH FROM d.fecha) / 3.0)::INT      AS anio_trimestre,

        -- Fin de semana: Sabado (6) o Domingo (0)
        CASE WHEN EXTRACT(DOW FROM d.fecha) IN (0, 6) THEN 1 ELSE 0 END
                                                                  AS es_fin_semana,

        -- Festivo
        CASE WHEN f.fecha IS NOT NULL THEN 1 ELSE 0 END          AS es_festivo,
        f.nombre_festivo,

        -- Dia laboral: entre semana Y no festivo
        CASE
            WHEN EXTRACT(DOW FROM d.fecha) NOT IN (0, 6)
             AND f.fecha IS NULL
            THEN 1
            ELSE 0
        END                                                       AS es_dia_laboral,

        -- Periodo fiscal (año calendario = año fiscal para Olimpica)
        TO_CHAR(d.fecha, 'YYYY') || '-P'
            || LPAD(EXTRACT(MONTH FROM d.fecha)::TEXT, 2, '0')   AS periodo_fiscal,

        EXTRACT(YEAR  FROM d.fecha)::NUMERIC                     AS anio_fiscal,
        EXTRACT(MONTH FROM d.fecha)::NUMERIC                     AS mes_fiscal

    FROM dias_2026 d
    LEFT JOIN festivos_2026 f ON d.fecha = f.fecha
)

-- -----------------------------------------------------------------------------
-- Insertar en la tabla de dimension
-- ON CONFLICT DO NOTHING: idempotente, no falla si ya existe el registro
-- -----------------------------------------------------------------------------
INSERT INTO smr_dm_dim_fecha (
    fecha_key,
    fecha,
    anio,
    mes,
    dia,
    trimestre,
    semestre,
    numero_semana,
    dia_semana,
    nombre_dia_semana,
    nombre_mes,
    nombre_trimestre,
    anio_mes,
    anio_trimestre,
    es_fin_semana,
    es_festivo,
    nombre_festivo,
    es_dia_laboral,
    periodo_fiscal,
    anio_fiscal,
    mes_fiscal
)
SELECT
    fecha_key,
    fecha,
    anio,
    mes,
    dia,
    trimestre,
    semestre,
    numero_semana,
    dia_semana,
    nombre_dia_semana,
    nombre_mes,
    nombre_trimestre,
    anio_mes,
    anio_trimestre,
    es_fin_semana,
    es_festivo,
    nombre_festivo,
    es_dia_laboral,
    periodo_fiscal,
    anio_fiscal,
    mes_fiscal
FROM calendario
ORDER BY fecha_key
ON CONFLICT (fecha_key) DO NOTHING;

-- -----------------------------------------------------------------------------
-- Resumen de lo insertado
-- -----------------------------------------------------------------------------
DO $$
DECLARE
    v_total        INTEGER;
    v_festivos     INTEGER;
    v_fines        INTEGER;
    v_habiles      INTEGER;
BEGIN
    SELECT COUNT(*) INTO v_total
    FROM smr_dm_dim_fecha WHERE anio = 2026;

    SELECT COUNT(*) INTO v_festivos
    FROM smr_dm_dim_fecha WHERE anio = 2026 AND es_festivo = 1;

    SELECT COUNT(*) INTO v_fines
    FROM smr_dm_dim_fecha WHERE anio = 2026 AND es_fin_semana = 1;

    SELECT COUNT(*) INTO v_habiles
    FROM smr_dm_dim_fecha WHERE anio = 2026 AND es_dia_laboral = 1;

    RAISE NOTICE '========================================';
    RAISE NOTICE 'RESUMEN CALENDARIO 2026 - COLOMBIA';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Total dias           : %', v_total;
    RAISE NOTICE 'Festivos             : %', v_festivos;
    RAISE NOTICE 'Fines de semana      : %', v_fines;
    RAISE NOTICE 'Dias habiles         : %', v_habiles;
    RAISE NOTICE '========================================';
END;
$$;

COMMIT;

-- -----------------------------------------------------------------------------
-- Verificacion rapida: festivos del año
-- -----------------------------------------------------------------------------
SELECT
    fecha_key,
    fecha,
    nombre_dia_semana,
    nombre_festivo,
    CASE WHEN es_fin_semana = 1 THEN 'Si' ELSE 'No' END AS fin_semana,
    CASE WHEN es_dia_laboral = 1 THEN 'Si' ELSE 'No' END AS habil
FROM smr_dm_dim_fecha
WHERE anio = 2026
  AND es_festivo = 1
ORDER BY fecha;
