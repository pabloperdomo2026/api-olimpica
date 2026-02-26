-- =============================================================================
-- DATOS MODELO ESTRELLA - SCANNTECH v4.0
-- Motor   : PostgreSQL
-- Schema  : monitor
-- Tablas  : 16 (9 dim + 5 fact + 2 agg)
-- Fecha   : 2026-02-23
-- Orden de carga:
--   1. smr_dim_fecha         (generado con generate_series)
--   2. smr_dim_tiempo        (1440 registros, generate_series)
--   3. smr_dim_status        (desde smr_status_proceso)
--   4. smr_dim_fuente        (desde smr_fuente_datos)
--   5. smr_dim_destino       (desde smr_destino_datos)
--   6. smr_dim_punto_venta   (desde smr_punto_venta)
--   7. smr_dim_usuario       (desde smr_usuario)
--   8. smr_dim_tipo_error    (catalogo de errores)
--   9. smr_dim_proceso       (desde smr_proceso, SCD2)
--  10. smr_fact_ejecucion    (30 dias de ejecuciones de prueba)
--  11. smr_fact_lote         (lotes de cada ejecucion)
--  12. smr_fact_error        (errores registrados)
--  13. smr_fact_sla          (cumplimiento SLA por ejecucion)
--  14. smr_fact_alerta       (alertas enviadas)
--  15. smr_agg_resumen_diario          (recalculo desde facts)
--  16. smr_agg_resumen_punto_venta     (recalculo desde facts)
-- =============================================================================

SET search_path TO monitor;

-- Limpiar datos anteriores (orden inverso por FKs)
TRUNCATE TABLE smr_agg_resumen_punto_venta   CASCADE;
TRUNCATE TABLE smr_agg_resumen_diario        CASCADE;
TRUNCATE TABLE smr_fact_alerta               CASCADE;
TRUNCATE TABLE smr_fact_sla                  CASCADE;
TRUNCATE TABLE smr_fact_lote                 CASCADE;
TRUNCATE TABLE smr_fact_error                CASCADE;
TRUNCATE TABLE smr_fact_ejecucion            CASCADE;
TRUNCATE TABLE smr_dim_tipo_error            CASCADE;
TRUNCATE TABLE smr_dim_destino               CASCADE;
TRUNCATE TABLE smr_dim_fuente                CASCADE;
TRUNCATE TABLE smr_dim_usuario               CASCADE;
TRUNCATE TABLE smr_dim_punto_venta           CASCADE;
TRUNCATE TABLE smr_dim_status                CASCADE;
TRUNCATE TABLE smr_dim_proceso               CASCADE;
TRUNCATE TABLE smr_dim_tiempo                CASCADE;
TRUNCATE TABLE smr_dim_fecha                 CASCADE;


-- =============================================================================
-- 1. smr_dim_fecha  — 2 anos: 2025-01-01 al 2026-12-31
--    Incluye festivos Colombia (Ley 51/1983)
-- =============================================================================
INSERT INTO smr_dim_fecha (
    fecha_key, fecha, anio, mes, dia,
    trimestre, semestre, numero_semana, dia_semana,
    nombre_dia_semana, nombre_mes, nombre_trimestre,
    anio_mes, anio_trimestre,
    es_fin_semana, es_festivo, nombre_festivo, es_dia_laboral,
    periodo_fiscal, anio_fiscal, mes_fiscal
)
WITH

-- Rango de fechas
serie AS (
    SELECT d::date AS fecha
    FROM generate_series('2025-01-01'::date, '2026-12-31'::date, '1 day') d
),

-- Festivos fijos Colombia
festivos_fijos AS (
    SELECT * FROM (VALUES
        -- 2025
        ('2025-01-01'::date, 'Ano Nuevo'),
        ('2025-05-01'::date, 'Dia del Trabajo'),
        ('2025-07-20'::date, 'Dia de la Independencia'),
        ('2025-08-07'::date, 'Batalla de Boyaca'),
        ('2025-12-08'::date, 'Inmaculada Concepcion'),
        ('2025-12-25'::date, 'Navidad'),
        -- Festivos de puente 2025 (trasladados al lunes)
        ('2025-01-06'::date, 'Reyes Magos'),
        ('2025-03-24'::date, 'San Jose'),         -- 19 mar -> lunes siguiente
        ('2025-04-17'::date, 'Jueves Santo'),
        ('2025-04-18'::date, 'Viernes Santo'),
        ('2025-05-29'::date, 'Ascension del Senor'),
        ('2025-06-19'::date, 'Corpus Christi'),
        ('2025-06-23'::date, 'Sagrado Corazon'),
        ('2025-06-30'::date, 'San Pedro y San Pablo'),
        ('2025-08-18'::date, 'Asuncion de la Virgen'),
        ('2025-10-13'::date, 'Dia de la Raza'),
        ('2025-11-03'::date, 'Todos los Santos'),
        ('2025-11-17'::date, 'Independencia de Cartagena'),
        ('2025-12-01'::date, 'Dia del Maestro Colombiano'),
        -- 2026
        ('2026-01-01'::date, 'Ano Nuevo'),
        ('2026-05-01'::date, 'Dia del Trabajo'),
        ('2026-07-20'::date, 'Dia de la Independencia'),
        ('2026-08-07'::date, 'Batalla de Boyaca'),
        ('2026-12-08'::date, 'Inmaculada Concepcion'),
        ('2026-12-25'::date, 'Navidad'),
        -- Festivos de puente 2026
        ('2026-01-12'::date, 'Reyes Magos'),
        ('2026-03-23'::date, 'San Jose'),
        ('2026-04-02'::date, 'Jueves Santo'),
        ('2026-04-03'::date, 'Viernes Santo'),
        ('2026-05-14'::date, 'Ascension del Senor'),
        ('2026-06-04'::date, 'Corpus Christi'),
        ('2026-06-15'::date, 'Sagrado Corazon'),
        ('2026-06-29'::date, 'San Pedro y San Pablo'),
        ('2026-08-17'::date, 'Asuncion de la Virgen'),
        ('2026-10-12'::date, 'Dia de la Raza'),
        ('2026-11-02'::date, 'Todos los Santos'),
        ('2026-11-16'::date, 'Independencia de Cartagena')
    ) AS f(fecha, nombre)
)

SELECT
    -- Clave surrogada YYYYMMDD
    TO_CHAR(s.fecha, 'YYYYMMDD')::numeric                                     AS fecha_key,
    s.fecha,
    EXTRACT(YEAR  FROM s.fecha)::numeric                                       AS anio,
    EXTRACT(MONTH FROM s.fecha)::numeric                                       AS mes,
    EXTRACT(DAY   FROM s.fecha)::numeric                                       AS dia,
    EXTRACT(QUARTER FROM s.fecha)::numeric                                     AS trimestre,
    CASE WHEN EXTRACT(MONTH FROM s.fecha) <= 6 THEN 1 ELSE 2 END              AS semestre,
    EXTRACT(WEEK FROM s.fecha)::numeric                                        AS numero_semana,
    -- 0=domingo, 1=lunes ... 6=sabado  (ISODOW: 7=dom, lo convertimos)
    CASE EXTRACT(ISODOW FROM s.fecha)::int
        WHEN 7 THEN 0 ELSE EXTRACT(ISODOW FROM s.fecha)::int END               AS dia_semana,
    -- Nombre dia
    CASE EXTRACT(ISODOW FROM s.fecha)::int
        WHEN 1 THEN 'Lunes' WHEN 2 THEN 'Martes' WHEN 3 THEN 'Miercoles'
        WHEN 4 THEN 'Jueves' WHEN 5 THEN 'Viernes' WHEN 6 THEN 'Sabado'
        ELSE 'Domingo' END                                                      AS nombre_dia_semana,
    -- Nombre mes
    CASE EXTRACT(MONTH FROM s.fecha)::int
        WHEN  1 THEN 'Enero'      WHEN  2 THEN 'Febrero'   WHEN  3 THEN 'Marzo'
        WHEN  4 THEN 'Abril'      WHEN  5 THEN 'Mayo'       WHEN  6 THEN 'Junio'
        WHEN  7 THEN 'Julio'      WHEN  8 THEN 'Agosto'     WHEN  9 THEN 'Septiembre'
        WHEN 10 THEN 'Octubre'    WHEN 11 THEN 'Noviembre'  WHEN 12 THEN 'Diciembre'
    END                                                                         AS nombre_mes,
    -- Nombre trimestre
    CASE EXTRACT(QUARTER FROM s.fecha)::int
        WHEN 1 THEN 'Q1 - Primer Trimestre'   WHEN 2 THEN 'Q2 - Segundo Trimestre'
        WHEN 3 THEN 'Q3 - Tercer Trimestre'   WHEN 4 THEN 'Q4 - Cuarto Trimestre'
    END                                                                         AS nombre_trimestre,
    TO_CHAR(s.fecha, 'YYYY-MM')                                                AS anio_mes,
    TO_CHAR(s.fecha, 'YYYY') || '-Q' || EXTRACT(QUARTER FROM s.fecha)::text   AS anio_trimestre,
    -- Fin de semana (sabado o domingo)
    CASE WHEN EXTRACT(ISODOW FROM s.fecha) IN (6, 7) THEN 1 ELSE 0 END        AS es_fin_semana,
    -- Festivo
    CASE WHEN f.fecha IS NOT NULL THEN 1 ELSE 0 END                            AS es_festivo,
    f.nombre                                                                    AS nombre_festivo,
    -- Dia laboral = entre semana Y no festivo
    CASE WHEN EXTRACT(ISODOW FROM s.fecha) NOT IN (6, 7)
              AND f.fecha IS NULL THEN 1 ELSE 0 END                            AS es_dia_laboral,
    -- Periodo fiscal YYYY-Pnn
    TO_CHAR(s.fecha, 'YYYY') || '-P' || LPAD(EXTRACT(MONTH FROM s.fecha)::text, 2, '0')
                                                                                AS periodo_fiscal,
    EXTRACT(YEAR  FROM s.fecha)::numeric                                       AS anio_fiscal,
    EXTRACT(MONTH FROM s.fecha)::numeric                                       AS mes_fiscal

FROM serie s
LEFT JOIN festivos_fijos f ON f.fecha = s.fecha
ORDER BY s.fecha;


-- =============================================================================
-- 2. smr_dim_tiempo  — 1440 registros (24h x 60min)
-- =============================================================================
INSERT INTO smr_dim_tiempo (
    tiempo_key, hora, minuto, segundo,
    hora_24, hora_12, periodo_dia, turno,
    es_horario_laboral, es_horario_pico
)
SELECT
    h * 100 + m                                                                AS tiempo_key,
    h                                                                           AS hora,
    m                                                                           AS minuto,
    0                                                                           AS segundo,
    LPAD(h::text, 2, '0') || ':' || LPAD(m::text, 2, '0')                    AS hora_24,
    CASE
        WHEN h = 0                    THEN '12:' || LPAD(m::text, 2, '0') || ' AM'
        WHEN h < 12                   THEN  h::text || ':' || LPAD(m::text, 2, '0') || ' AM'
        WHEN h = 12                   THEN '12:' || LPAD(m::text, 2, '0') || ' PM'
        ELSE (h - 12)::text || ':' || LPAD(m::text, 2, '0') || ' PM'
    END                                                                         AS hora_12,
    CASE
        WHEN h BETWEEN 0  AND  5 THEN 'Madrugada'
        WHEN h BETWEEN 6  AND 11 THEN 'Manana'
        WHEN h BETWEEN 12 AND 17 THEN 'Tarde'
        ELSE                          'Noche'
    END                                                                         AS periodo_dia,
    CASE
        WHEN h BETWEEN  6 AND 13 THEN 'Turno-A'
        WHEN h BETWEEN 14 AND 21 THEN 'Turno-B'
        ELSE                          'Turno-C'
    END                                                                         AS turno,
    CASE WHEN h BETWEEN 7 AND 18 THEN 1 ELSE 0 END                            AS es_horario_laboral,
    CASE WHEN h BETWEEN 4 AND  7 THEN 1 ELSE 0 END                            AS es_horario_pico

FROM generate_series(0, 23) h
CROSS JOIN generate_series(0, 59) m
ORDER BY h, m;


-- =============================================================================
-- 3. smr_dim_status  — Desde smr_status_proceso
-- =============================================================================
INSERT INTO smr_dim_status (
    status_key, status_id, codigo_status, nombre_status,
    categoria_status, es_final, es_exitoso, es_error,
    permite_reintento, orden_visualizacion, color_hex,
    smr_organizacion_organizacion_id
)
SELECT
    1000 + sp.status_proceso_id                                                AS status_key,
    sp.status_proceso_id,
    sp.codigo,
    sp.nombre,
    CASE sp.codigo
        WHEN 'TERMINADO'   THEN 'EXITOSO'
        WHEN 'FALLIDO'     THEN 'ERROR'
        WHEN 'CANCELADO'   THEN 'CANCELADO'
        WHEN 'EN_PROCESO'  THEN 'EN_CURSO'
        WHEN 'PENDIENTE'   THEN 'EN_CURSO'
        WHEN 'EN_PAUSA'    THEN 'EN_CURSO'
        ELSE 'OTRO'
    END                                                                         AS categoria_status,
    CASE sp.codigo WHEN 'TERMINADO' THEN 1 WHEN 'FALLIDO' THEN 1
                   WHEN 'CANCELADO' THEN 1 ELSE 0 END                          AS es_final,
    CASE sp.codigo WHEN 'TERMINADO' THEN 1 ELSE 0 END                         AS es_exitoso,
    CASE sp.codigo WHEN 'FALLIDO'   THEN 1 ELSE 0 END                         AS es_error,
    CASE sp.codigo WHEN 'FALLIDO'   THEN 1 WHEN 'EN_PAUSA' THEN 1
                   ELSE 0 END                                                   AS permite_reintento,
    sp.orden_presentacion,
    sp.color_hex,
    1                                                                           AS smr_organizacion_organizacion_id
FROM smr_status_proceso sp
ORDER BY sp.status_proceso_id;


-- =============================================================================
-- 4. smr_dim_fuente  — Desde smr_fuente_datos
-- =============================================================================
INSERT INTO smr_dim_fuente (
    fuente_key, fuente_id, codigo_fuente, nombre_fuente,
    tipo_fuente, categoria_fuente, activo,
    smr_organizacion_organizacion_id
)
SELECT
    2000 + fd.fuente_datos_id                                                  AS fuente_key,
    fd.fuente_datos_id,
    fd.codigo,
    fd.nombre,
    tf.codigo                                                                   AS tipo_fuente,
    CASE tf.codigo
        WHEN 'REDSHIFT'  THEN 'DATABASE'
        WHEN 'ORACLE'    THEN 'DATABASE'
        WHEN 'POSTGRES'  THEN 'DATABASE'
        WHEN 'S3'        THEN 'STORAGE'
        WHEN 'API_REST'  THEN 'API'
        ELSE 'OTRO'
    END                                                                         AS categoria_fuente,
    CASE WHEN fd.activo THEN 1 ELSE 0 END,
    fd.smr_organizacion_organizacion_id
FROM smr_fuente_datos fd
JOIN smr_tipo_fuente tf ON tf.tipo_fuente_id = fd.smr_tipo_fuente_tipo_fuente_id;


-- =============================================================================
-- 5. smr_dim_destino  — Desde smr_destino_datos
-- =============================================================================
INSERT INTO smr_dim_destino (
    destino_key, destino_id, codigo_destino, nombre_destino,
    tipo_destino, categoria_destino, activo,
    smr_organizacion_organizacion_id
)
SELECT
    3000 + dd.destino_datos_id                                                 AS destino_key,
    dd.destino_datos_id,
    dd.codigo,
    dd.nombre,
    td.codigo                                                                   AS tipo_destino,
    CASE td.codigo
        WHEN 'SCANNTECH' THEN 'API'
        WHEN 'REDSHIFT'  THEN 'DATABASE'
        WHEN 'S3'        THEN 'STORAGE'
        WHEN 'ORACLE'    THEN 'DATABASE'
        ELSE 'OTRO'
    END                                                                         AS categoria_destino,
    CASE WHEN dd.activo THEN 1 ELSE 0 END,
    dd.smr_organizacion_organizacion_id
FROM smr_destino_datos dd
JOIN smr_tipo_destino td ON td.tipo_destino_id = dd.smr_tipo_destino_tipo_destino_id;


-- =============================================================================
-- 6. smr_dim_punto_venta  — Desde smr_punto_venta + puntos adicionales
-- =============================================================================
INSERT INTO smr_dim_punto_venta (
    punto_venta_key, punto_venta_id, codigo_tienda, nombre_tienda,
    region, zona, ciudad, departamento,
    tipo_tienda, tamano_tienda, fecha_apertura, activo,
    smr_organizacion_organizacion_id
)
SELECT
    4000 + pv.punto_venta_id                                                   AS punto_venta_key,
    pv.punto_venta_id,
    pv.codigo_tienda,
    pv.nombre_tienda,
    pv.region,
    'Zona ' || pv.region                                                       AS zona,
    pv.ciudad,
    pv.region                                                                   AS departamento,
    'Hipermercado'                                                              AS tipo_tienda,
    'Grande'                                                                    AS tamano_tienda,
    '2015-01-01'::date                                                         AS fecha_apertura,
    CASE WHEN pv.activo THEN 1 ELSE 0 END,
    pv.smr_organizacion_organizacion_id
FROM smr_punto_venta pv;

-- Puntos de venta adicionales de ejemplo (Olimpica tiene ~70 tiendas)
INSERT INTO smr_dim_punto_venta (
    punto_venta_key, punto_venta_id, codigo_tienda, nombre_tienda,
    region, zona, ciudad, departamento,
    tipo_tienda, tamano_tienda, fecha_apertura, activo,
    smr_organizacion_organizacion_id
) VALUES
(4010, 10, 'BAQ001', 'Olimpica Barranquilla Centro',   'Caribe',  'Zona Norte',    'Barranquilla', 'Atlantico',    'Hipermercado', 'Grande',   '2010-06-15', 1, 1),
(4011, 11, 'BAQ002', 'Olimpica Barranquilla Norte',    'Caribe',  'Zona Norte',    'Barranquilla', 'Atlantico',    'Supermercado', 'Mediano',  '2014-03-20', 1, 1),
(4012, 12, 'CAR001', 'Olimpica Cartagena Bocagrande',  'Caribe',  'Zona Norte',    'Cartagena',    'Bolivar',      'Hipermercado', 'Grande',   '2008-11-10', 1, 1),
(4013, 13, 'MDE001', 'Olimpica Medellin El Poblado',   'Andina',  'Zona Centro',   'Medellin',     'Antioquia',    'Hipermercado', 'Grande',   '2012-07-04', 1, 1),
(4014, 14, 'MDE002', 'Olimpica Medellin Envigado',     'Andina',  'Zona Centro',   'Envigado',     'Antioquia',    'Supermercado', 'Mediano',  '2017-02-14', 1, 1),
(4015, 15, 'CLO001', 'Olimpica Cali Chipichape',       'Pacifica','Zona Sur',      'Cali',         'Valle',        'Hipermercado', 'Grande',   '2009-08-30', 1, 1),
(4016, 16, 'BGA001', 'Olimpica Bucaramanga Cacique',   'Andina',  'Zona Oriente',  'Bucaramanga',  'Santander',    'Hipermercado', 'Grande',   '2011-05-18', 1, 1),
(4017, 17, 'CTG001', 'Olimpica Santa Marta',           'Caribe',  'Zona Norte',    'Santa Marta',  'Magdalena',    'Supermercado', 'Mediano',  '2016-09-22', 1, 1),
(4018, 18, 'PEI001', 'Olimpica Pereira Victoria',      'Andina',  'Zona Centro',   'Pereira',      'Risaralda',    'Supermercado', 'Mediano',  '2013-12-05', 1, 1),
(4019, 19, 'VUP001', 'Olimpica Valledupar',            'Caribe',  'Zona Norte',    'Valledupar',   'Cesar',        'Supermercado', 'Pequeno',  '2019-04-08', 1, 1);


-- =============================================================================
-- 7. smr_dim_usuario  — Desde smr_usuario
-- =============================================================================
INSERT INTO smr_dim_usuario (
    usuario_key, usuario_id, username, nombre_completo,
    rol_principal, departamento, activo,
    smr_organizacion_organizacion_id
)
SELECT
    5000 + u.usuario_id                                                        AS usuario_key,
    u.usuario_id,
    u.nombre_usuario,
    u.nombre_completo,
    r.nombre                                                                    AS rol_principal,
    'Tecnologia'                                                                AS departamento,
    CASE WHEN u.activo THEN 1 ELSE 0 END,
    u.smr_organizacion_organizacion_id
FROM smr_usuario u
JOIN smr_usuario_rol ur ON ur.smr_usuario_usuario_id = u.usuario_id
JOIN smr_rol r          ON r.rol_id = ur.smr_rol_rol_id;

-- Usuario sistema (ejecuciones automaticas)
INSERT INTO smr_dim_usuario (
    usuario_key, usuario_id, username, nombre_completo,
    rol_principal, departamento, activo,
    smr_organizacion_organizacion_id
) VALUES
(5099, 99, 'sistema', 'Proceso Automatico', 'Sistema', 'ETL Automatico', 1, 1);


-- =============================================================================
-- 8. smr_dim_tipo_error  — Catalogo de tipos de error ETL
-- =============================================================================
INSERT INTO smr_dim_tipo_error (
    tipo_error_key, codigo_error, categoria_error,
    es_error_tecnico, es_error_negocio, es_error_datos, es_recuperable,
    severidad, nombre_severidad,
    smr_organizacion_organizacion_id
) VALUES
-- Errores de conexion / infraestructura
(6001, 'ERR_DB_CONN',        'CONEXION',        1, 0, 0, 1, 4, 'CRITICAL', 1),
(6002, 'ERR_API_TIMEOUT',    'CONEXION',        1, 0, 0, 1, 3, 'ERROR',    1),
(6003, 'ERR_API_5XX',        'CONEXION',        1, 0, 0, 1, 3, 'ERROR',    1),
(6004, 'ERR_API_4XX',        'CONEXION',        1, 0, 0, 0, 3, 'ERROR',    1),
(6005, 'ERR_RATE_LIMIT',     'CONEXION',        1, 0, 0, 1, 2, 'WARNING',  1),
-- Errores de transformacion / datos
(6010, 'ERR_VAL_NULO',       'VALIDACION',      0, 0, 1, 0, 2, 'WARNING',  1),
(6011, 'ERR_VAL_TIPO',       'VALIDACION',      0, 0, 1, 0, 2, 'WARNING',  1),
(6012, 'ERR_VAL_RANGO',      'VALIDACION',      0, 0, 1, 0, 2, 'WARNING',  1),
(6013, 'ERR_VAL_DUPLICADO',  'VALIDACION',      0, 0, 1, 0, 2, 'WARNING',  1),
(6014, 'ERR_TRANSFORM',      'TRANSFORMACION',  1, 0, 1, 0, 3, 'ERROR',    1),
-- Errores de negocio
(6020, 'ERR_NEG_PV_INV',     'NEGOCIO',         0, 1, 0, 0, 3, 'ERROR',    1),
(6021, 'ERR_NEG_PROD_INV',   'NEGOCIO',         0, 1, 0, 0, 2, 'WARNING',  1),
(6022, 'ERR_NEG_PRECIO',     'NEGOCIO',         0, 1, 0, 0, 2, 'WARNING',  1),
-- Errores de cloud / AWS
(6030, 'ERR_STEP_FUNC',      'CLOUD',           1, 0, 0, 1, 4, 'CRITICAL', 1),
(6031, 'ERR_LAMBDA',         'CLOUD',           1, 0, 0, 1, 3, 'ERROR',    1),
(6032, 'ERR_S3_ACCESS',      'CLOUD',           1, 0, 0, 1, 3, 'ERROR',    1),
-- SLA
(6040, 'ERR_SLA_TIEMPO',     'SLA',             0, 1, 0, 0, 3, 'ERROR',    1),
(6041, 'ERR_SLA_CALIDAD',    'SLA',             0, 1, 0, 0, 3, 'ERROR',    1);


-- =============================================================================
-- 9. smr_dim_proceso  — Desde smr_proceso (SCD Tipo 2, version vigente)
-- =============================================================================
INSERT INTO smr_dim_proceso (
    proceso_key, proceso_id, codigo_proceso, nombre_proceso,
    tipo_proceso, categoria_proceso, nivel_criticidad, nivel_criticidad_numerico,
    fuente_nombre, tipo_fuente, destino_nombre, tipo_destino,
    permite_ejecucion_paralela, requiere_ventana_mantenimiento, activo,
    fecha_efectiva_desde, fecha_efectiva_hasta, es_vigente,
    smr_organizacion_organizacion_id
)
SELECT
    7000 + p.proceso_id                                                        AS proceso_key,
    p.proceso_id,
    p.codigo,
    p.nombre,
    tp.codigo                                                                   AS tipo_proceso,
    'VENTAS'                                                                    AS categoria_proceso,
    nc.codigo                                                                   AS nivel_criticidad,
    nc.orden_severidad                                                          AS nivel_criticidad_numerico,
    fd.nombre                                                                   AS fuente_nombre,
    tf.codigo                                                                   AS tipo_fuente,
    dd.nombre                                                                   AS destino_nombre,
    td.codigo                                                                   AS tipo_destino,
    CASE WHEN p.permite_ejecucion_paralela THEN 1 ELSE 0 END,
    0                                                                           AS requiere_ventana_mantenimiento,
    CASE WHEN p.activo THEN 1 ELSE 0 END,
    NOW() - INTERVAL '90 days'                                                 AS fecha_efectiva_desde,
    NULL                                                                        AS fecha_efectiva_hasta,
    true                                                                        AS es_vigente,
    p.smr_organizacion_organizacion_id
FROM smr_proceso p
JOIN smr_tipo_proceso    tp ON tp.tipo_proceso_id   = p.smr_tipo_proceso_tipo_proceso_id
JOIN smr_fuente_datos    fd ON fd.fuente_datos_id   = p.smr_fuente_datos_fuente_datos_id
JOIN smr_tipo_fuente     tf ON tf.tipo_fuente_id    = fd.smr_tipo_fuente_tipo_fuente_id
JOIN smr_destino_datos   dd ON dd.destino_datos_id  = p.smr_destino_datos_destino_datos_id
JOIN smr_tipo_destino    td ON td.tipo_destino_id   = dd.smr_tipo_destino_tipo_destino_id
JOIN smr_nivel_criticidad nc ON nc.nivel_criticidad_id = 1;   -- CRITICO por defecto


-- =============================================================================
-- 10. smr_fact_ejecucion  — 30 dias de ejecuciones simuladas
--     Patron: 1 ejecucion por dia, mayoria exitosas, algunos fallos
--     Proceso: ETL_VENTAS_SCANN (proceso_id=1)
--     Horario: 04:00 AM cada dia, ~45 minutos de duracion
-- =============================================================================
INSERT INTO smr_fact_ejecucion (
    ejecucion_id,
    smr_dim_proceso_proceso_key,
    smr_dim_fecha_fecha_key,
    smr_dim_tiempo_tiempo_key,
    tiempo_fin_key,
    smr_dim_status_status_key,
    smr_dim_usuario_usuario_key,
    smr_dim_fuente_fuente_key,
    smr_dim_destino_destino_key,
    smr_dim_punto_venta_punto_venta_key,
    numero_registros_origen,
    numero_registros_procesados,
    numero_registros_exitosos,
    numero_registros_fallidos,
    numero_registros_rechazados,
    numero_lotes_total,
    numero_lotes_exitosos,
    numero_lotes_fallidos,
    porcentaje_exito,
    duracion_segundos,
    duracion_minutos,
    duracion_horas,
    tiempo_promedio_por_registro_ms,
    throughput_registros_por_segundo,
    throughput_mb_por_segundo,
    tamano_datos_procesados_mb,
    indicador_exito,
    indicador_error,
    indicador_warning,
    excede_sla,
    requiere_reintento,
    tiene_rechazos_calidad,
    numero_reintentos,
    numero_alertas_enviadas,
    numero_errores,
    numero_warnings,
    costo_estimado_usd,
    tipo_ejecucion,
    smr_organizacion_organizacion_id
)
WITH dias AS (
    SELECT
        d                                                      AS offset_dia,
        (CURRENT_DATE - (30 - d) * INTERVAL '1 day')::date   AS fecha_ejec,
        -- Simulacion: dia 5, 12, 20 = fallo; dia 8 = warning/excede SLA
        CASE WHEN d IN (5, 12, 20) THEN 'FALLIDO'
             ELSE 'TERMINADO' END                             AS resultado,
        CASE WHEN d = 8 THEN 1 ELSE 0 END                    AS es_lento,
        CASE WHEN d IN (5, 12, 20) THEN 0
             WHEN d = 8 THEN 0.97
             ELSE 0.9994 END                                  AS pct_exito
    FROM generate_series(1, 30) d
)
SELECT
    10000 + d.offset_dia                                                       AS ejecucion_id,
    7001                                                                        AS smr_dim_proceso_proceso_key,  -- ETL_VENTAS_SCANN
    TO_CHAR(d.fecha_ejec, 'YYYYMMDD')::numeric                                AS smr_dim_fecha_fecha_key,
    400                                                                         AS smr_dim_tiempo_tiempo_key,    -- 04:00 inicio
    CASE WHEN d.es_lento = 1 THEN 530
         WHEN d.resultado = 'FALLIDO' THEN 415
         ELSE 445 END                                                           AS tiempo_fin_key,              -- aprox 04:45
    -- status_key: TERMINADO=1003, FALLIDO=1004
    CASE WHEN d.resultado = 'FALLIDO' THEN 1004 ELSE 1003 END                 AS smr_dim_status_status_key,
    5099                                                                        AS smr_dim_usuario_usuario_key,  -- sistema
    2001                                                                        AS smr_dim_fuente_fuente_key,    -- REDSHIFT_PROD
    3001                                                                        AS smr_dim_destino_destino_key,  -- SCANNTECH_API
    NULL                                                                        AS smr_dim_punto_venta_punto_venta_key, -- aplica a todas
    -- Registros: ~35.000 por ejecucion exitosa, ~5000 si fallo rapido
    CASE WHEN d.resultado = 'FALLIDO' THEN 5000  ELSE 35000 END                AS numero_registros_origen,
    CASE WHEN d.resultado = 'FALLIDO' THEN 4800  ELSE 35000 END                AS numero_registros_procesados,
    CASE WHEN d.resultado = 'FALLIDO' THEN 0
         ELSE (35000 * d.pct_exito)::int END                                    AS numero_registros_exitosos,
    CASE WHEN d.resultado = 'FALLIDO' THEN 4800
         ELSE 35000 - (35000 * d.pct_exito)::int END                           AS numero_registros_fallidos,
    CASE WHEN d.resultado = 'FALLIDO' THEN 200   ELSE 2 END                    AS numero_registros_rechazados,
    -- Lotes: ceil(registros / 350)
    CASE WHEN d.resultado = 'FALLIDO' THEN 14    ELSE 100 END                  AS numero_lotes_total,
    CASE WHEN d.resultado = 'FALLIDO' THEN 0     ELSE 99  END                  AS numero_lotes_exitosos,
    CASE WHEN d.resultado = 'FALLIDO' THEN 14    ELSE 1   END                  AS numero_lotes_fallidos,
    -- Porcentaje exito
    CASE WHEN d.resultado = 'FALLIDO' THEN 0.00
         ELSE ROUND((d.pct_exito * 100)::numeric, 2) END                        AS porcentaje_exito,
    -- Duracion
    CASE WHEN d.es_lento = 1 THEN 5400  -- 90 min (excede SLA de 60)
         WHEN d.resultado = 'FALLIDO' THEN 900
         ELSE 2700 END                                                           AS duracion_segundos,
    CASE WHEN d.es_lento = 1 THEN 90.00
         WHEN d.resultado = 'FALLIDO' THEN 15.00
         ELSE 45.00 END                                                          AS duracion_minutos,
    CASE WHEN d.es_lento = 1 THEN 1.5000
         WHEN d.resultado = 'FALLIDO' THEN 0.2500
         ELSE 0.7500 END                                                         AS duracion_horas,
    -- Throughput
    CASE WHEN d.resultado = 'FALLIDO' THEN 0
         ELSE ROUND((2700.0 / 35000 * 1000)::numeric, 4) END                    AS tiempo_promedio_por_registro_ms,
    CASE WHEN d.resultado = 'FALLIDO' THEN 0
         ELSE ROUND((35000.0 / 2700)::numeric, 2) END                           AS throughput_registros_por_segundo,
    CASE WHEN d.resultado = 'FALLIDO' THEN 0 ELSE 0.54 END                     AS throughput_mb_por_segundo,
    CASE WHEN d.resultado = 'FALLIDO' THEN 0 ELSE 87.50 END                    AS tamano_datos_procesados_mb,
    -- Indicadores
    CASE WHEN d.resultado = 'TERMINADO' THEN 1 ELSE 0 END                      AS indicador_exito,
    CASE WHEN d.resultado = 'FALLIDO'   THEN 1 ELSE 0 END                      AS indicador_error,
    CASE WHEN d.es_lento = 1 OR d.pct_exito < 1 THEN 1 ELSE 0 END             AS indicador_warning,
    -- Excede SLA (tiempo > 60 min = 3600 seg)
    CASE WHEN d.es_lento = 1 THEN 1 ELSE 0 END                                 AS excede_sla,
    CASE WHEN d.resultado = 'FALLIDO'   THEN 1 ELSE 0 END                      AS requiere_reintento,
    CASE WHEN d.pct_exito < 1 AND d.resultado = 'TERMINADO' THEN 1 ELSE 0 END  AS tiene_rechazos_calidad,
    CASE WHEN d.resultado = 'FALLIDO'   THEN 2 ELSE 0 END                      AS numero_reintentos,
    CASE WHEN d.resultado = 'FALLIDO'   THEN 2
         WHEN d.es_lento = 1 THEN 1 ELSE 0 END                                  AS numero_alertas_enviadas,
    CASE WHEN d.resultado = 'FALLIDO'   THEN 5 ELSE 0 END                      AS numero_errores,
    CASE WHEN d.es_lento = 1 OR d.pct_exito < 1 THEN 3 ELSE 0 END             AS numero_warnings,
    CASE WHEN d.resultado = 'FALLIDO'   THEN 0.0012
         ELSE 0.0024 END                                                         AS costo_estimado_usd,
    'AUTOMATICO'                                                                 AS tipo_ejecucion,
    1                                                                            AS smr_organizacion_organizacion_id
FROM dias d;


-- =============================================================================
-- 11. smr_fact_lote  — Lotes de cada ejecucion exitosa
--     Solo para ejecuciones exitosas (no fallidas)
--     Se generan 99 lotes exitosos + 1 fallido para ejecucion exitosa
--     Para ejecuciones fallidas: 0 lotes (fallaron antes de enviar)
-- =============================================================================
INSERT INTO smr_fact_lote (
    lote_id,
    smr_fact_ejecucion_ejecucion_id,
    smr_dim_proceso_proceso_key,
    smr_dim_fecha_fecha_key,
    smr_dim_tiempo_tiempo_key,
    smr_dim_status_status_key,
    smr_dim_punto_venta_punto_venta_key,
    numero_lote,
    id_lote_externo,
    numero_registros_lote,
    numero_registros_exitosos,
    numero_registros_fallidos,
    porcentaje_exito_lote,
    duracion_milisegundos,
    lote_exitoso,
    lote_fallido,
    requiere_reintento,
    numero_reintentos,
    codigo_http,
    es_http_exitoso,
    smr_organizacion_organizacion_id
)
WITH ejecuciones_ok AS (
    SELECT
        fe.ejecucion_id,
        fe.smr_dim_fecha_fecha_key,
        fe.smr_dim_proceso_proceso_key
    FROM smr_fact_ejecucion fe
    WHERE fe.indicador_exito = 1
),
lotes AS (
    SELECT
        e.ejecucion_id,
        e.smr_dim_fecha_fecha_key,
        e.smr_dim_proceso_proceso_key,
        n                                                                       AS numero_lote,
        -- Ultimo lote (100) tiene fallo simulado
        CASE WHEN n = 100 THEN 0 ELSE 1 END                                    AS es_exitoso
    FROM ejecuciones_ok e
    CROSS JOIN generate_series(1, 100) n
)
SELECT
    -- PK unica: ejecucion * 1000 + numero_lote
    l.ejecucion_id * 1000 + l.numero_lote                                      AS lote_id,
    l.ejecucion_id,
    l.smr_dim_proceso_proceso_key,
    l.smr_dim_fecha_fecha_key,
    400 + (l.numero_lote / 10)                                                  AS smr_dim_tiempo_tiempo_key,
    CASE WHEN l.es_exitoso = 1 THEN 1003 ELSE 1004 END                         AS smr_dim_status_status_key,
    NULL                                                                         AS smr_dim_punto_venta_punto_venta_key,
    l.numero_lote,
    'LOTE-' || TO_CHAR(l.smr_dim_fecha_fecha_key, 'FM00000000') || '-' ||
        LPAD(l.numero_lote::text, 5, '0')                                       AS id_lote_externo,
    350                                                                          AS numero_registros_lote,
    CASE WHEN l.es_exitoso = 1 THEN 350 ELSE 0 END                             AS numero_registros_exitosos,
    CASE WHEN l.es_exitoso = 1 THEN 0   ELSE 350 END                           AS numero_registros_fallidos,
    CASE WHEN l.es_exitoso = 1 THEN 100.00 ELSE 0.00 END                       AS porcentaje_exito_lote,
    -- Tiempo de respuesta: entre 800 y 1500 ms
    800 + (l.numero_lote % 7) * 100                                             AS duracion_milisegundos,
    l.es_exitoso                                                                 AS lote_exitoso,
    1 - l.es_exitoso                                                             AS lote_fallido,
    1 - l.es_exitoso                                                             AS requiere_reintento,
    1 - l.es_exitoso                                                             AS numero_reintentos,
    CASE WHEN l.es_exitoso = 1 THEN 200 ELSE 503 END                           AS codigo_http,
    l.es_exitoso                                                                 AS es_http_exitoso,
    1
FROM lotes l;


-- =============================================================================
-- 12. smr_fact_error  — Errores de las ejecuciones fallidas
--     3 ejecuciones fallidas (dia 5, 12, 20 = ejecucion_id 10005, 10012, 10020)
-- =============================================================================
INSERT INTO smr_fact_error (
    error_id,
    smr_fact_ejecucion_ejecucion_id,
    smr_dim_proceso_proceso_key,
    smr_dim_fecha_fecha_key,
    smr_dim_tiempo_tiempo_key,
    smr_dim_tipo_error_tipo_error_key,
    smr_dim_status_status_key,
    smr_dim_punto_venta_punto_venta_key,
    numero_errores,
    numero_registros_afectados,
    numero_lotes_afectados,
    codigo_error,
    categoria_error,
    severidad_error,
    es_error_critico,
    es_error_recuperable,
    fue_resuelto,
    fue_reintentado,
    numero_reintentos,
    tiempo_resolucion_minutos,
    smr_organizacion_organizacion_id
)
SELECT
    e.ejecucion_id * 10 + n                                                    AS error_id,
    e.ejecucion_id,
    e.smr_dim_proceso_proceso_key,
    e.smr_dim_fecha_fecha_key,
    410                                                                          AS smr_dim_tiempo_tiempo_key,
    -- Alternar tipos de error: timeout, 5xx, step_func
    CASE n % 3
        WHEN 1 THEN 6002  -- ERR_API_TIMEOUT
        WHEN 2 THEN 6003  -- ERR_API_5XX
        ELSE       6030   -- ERR_STEP_FUNC
    END                                                                          AS smr_dim_tipo_error_tipo_error_key,
    1004                                                                         AS smr_dim_status_status_key,
    NULL,
    1                                                                            AS numero_errores,
    350                                                                          AS numero_registros_afectados,
    1                                                                            AS numero_lotes_afectados,
    CASE n % 3
        WHEN 1 THEN 'ERR_API_TIMEOUT'
        WHEN 2 THEN 'ERR_API_5XX'
        ELSE       'ERR_STEP_FUNC'
    END                                                                          AS codigo_error,
    CASE n % 3
        WHEN 1 THEN 'CONEXION'
        WHEN 2 THEN 'CONEXION'
        ELSE       'CLOUD'
    END                                                                          AS categoria_error,
    CASE n % 3
        WHEN 1 THEN 3
        WHEN 2 THEN 3
        ELSE       4
    END                                                                          AS severidad_error,
    CASE n % 3 WHEN 0 THEN 1 ELSE 0 END                                        AS es_error_critico,
    1                                                                            AS es_error_recuperable,
    true                                                                         AS fue_resuelto,
    true                                                                         AS fue_reintentado,
    2                                                                            AS numero_reintentos,
    CASE n % 3
        WHEN 1 THEN 12.5
        WHEN 2 THEN 18.0
        ELSE       25.0
    END                                                                          AS tiempo_resolucion_minutos,
    1
FROM smr_fact_ejecucion e
CROSS JOIN generate_series(1, 5) n   -- 5 errores por ejecucion fallida
WHERE e.indicador_error = 1;

-- Errores leves en ejecuciones exitosas con warnings (dia 8 = ejecucion 10008)
INSERT INTO smr_fact_error (
    error_id, smr_fact_ejecucion_ejecucion_id, smr_dim_proceso_proceso_key,
    smr_dim_fecha_fecha_key, smr_dim_tiempo_tiempo_key,
    smr_dim_tipo_error_tipo_error_key, smr_dim_status_status_key,
    numero_errores, numero_registros_afectados, codigo_error, categoria_error,
    severidad_error, es_error_critico, es_error_recuperable, fue_resuelto,
    smr_organizacion_organizacion_id
)
SELECT
    e.ejecucion_id * 10 + n                                                    AS error_id,
    e.ejecucion_id,
    e.smr_dim_proceso_proceso_key,
    e.smr_dim_fecha_fecha_key,
    445,
    6005,   -- ERR_RATE_LIMIT
    1003,
    1, 350,
    'ERR_RATE_LIMIT', 'CONEXION',
    2, 0, 1, true, 1
FROM smr_fact_ejecucion e
CROSS JOIN generate_series(1, 3) n
WHERE e.excede_sla = 1;


-- =============================================================================
-- 13. smr_fact_sla  — Un registro por ejecucion
-- =============================================================================
INSERT INTO smr_fact_sla (
    sla_id,
    smr_fact_ejecucion_ejecucion_id,
    smr_dim_proceso_proceso_key,
    smr_dim_fecha_fecha_key,
    tiempo_maximo_permitido_minutos,
    tiempo_real_ejecucion_minutos,
    diferencia_sla_minutos,
    porcentaje_uso_sla,
    umbral_calidad_minimo,
    porcentaje_calidad_real,
    umbral_error_maximo,
    porcentaje_error_real,
    cumple_sla_tiempo,
    cumple_sla_calidad,
    cumple_sla_errores,
    cumple_sla_general,
    excede_sla_por_minutos,
    smr_organizacion_organizacion_id
)
SELECT
    20000 + fe.ejecucion_id                                                    AS sla_id,
    fe.ejecucion_id,
    fe.smr_dim_proceso_proceso_key,
    fe.smr_dim_fecha_fecha_key,
    60.0                                                                        AS tiempo_maximo_permitido_minutos,
    fe.duracion_minutos,
    fe.duracion_minutos - 60.0                                                  AS diferencia_sla_minutos,
    ROUND((fe.duracion_minutos / 60.0 * 100)::numeric, 2)                      AS porcentaje_uso_sla,
    99.00                                                                        AS umbral_calidad_minimo,
    CASE WHEN fe.indicador_error = 1 THEN 0.00 ELSE fe.porcentaje_exito END    AS porcentaje_calidad_real,
    1.00                                                                         AS umbral_error_maximo,
    CASE WHEN fe.indicador_error = 1 THEN 100.00
         ELSE 100.0 - fe.porcentaje_exito END                                   AS porcentaje_error_real,
    CASE WHEN fe.duracion_minutos <= 60 THEN 1 ELSE 0 END                      AS cumple_sla_tiempo,
    CASE WHEN fe.indicador_error = 0 AND fe.porcentaje_exito >= 99.00 THEN 1
         ELSE 0 END                                                              AS cumple_sla_calidad,
    CASE WHEN fe.indicador_error = 0 AND (100.0 - fe.porcentaje_exito) <= 1.00
         THEN 1 ELSE 0 END                                                       AS cumple_sla_errores,
    CASE WHEN fe.duracion_minutos <= 60
              AND fe.indicador_error = 0
              AND fe.porcentaje_exito >= 99.00 THEN 1
         ELSE 0 END                                                              AS cumple_sla_general,
    GREATEST(0, fe.duracion_minutos - 60.0)                                    AS excede_sla_por_minutos,
    1
FROM smr_fact_ejecucion fe;


-- =============================================================================
-- 14. smr_fact_alerta  — Alertas de ejecuciones con error o SLA excedido
-- =============================================================================
INSERT INTO smr_fact_alerta (
    alerta_id,
    smr_fact_ejecucion_ejecucion_id,
    smr_dim_proceso_proceso_key,
    smr_dim_fecha_fecha_key,
    smr_dim_tiempo_tiempo_key,
    smr_dim_tipo_error_tipo_error_key,
    smr_dim_usuario_usuario_key,
    tipo_alerta,
    categoria_alerta,
    nivel_prioridad,
    severidad,
    numero_alertas,
    fue_enviada,
    fue_confirmada,
    requiere_accion_inmediata,
    tiempo_respuesta_minutos,
    smr_organizacion_organizacion_id
)
-- Alertas por ejecuciones fallidas
SELECT
    30000 + fe.ejecucion_id * 10 + n                                           AS alerta_id,
    fe.ejecucion_id,
    fe.smr_dim_proceso_proceso_key,
    fe.smr_dim_fecha_fecha_key,
    420,
    6002,   -- ERR_API_TIMEOUT
    5001,   -- admin
    CASE n WHEN 1 THEN 'EMAIL' WHEN 2 THEN 'SNS' ELSE 'SLACK' END             AS tipo_alerta,
    'ERROR_PROCESO',
    4, 4, 1,
    true, true, true,
    CASE n WHEN 1 THEN 5.0 WHEN 2 THEN 3.0 ELSE 8.0 END,
    1
FROM smr_fact_ejecucion fe
CROSS JOIN generate_series(1, 2) n
WHERE fe.indicador_error = 1

UNION ALL

-- Alertas por SLA excedido
SELECT
    30000 + fe.ejecucion_id * 10 + 5                                           AS alerta_id,
    fe.ejecucion_id,
    fe.smr_dim_proceso_proceso_key,
    fe.smr_dim_fecha_fecha_key,
    530,
    6040,   -- ERR_SLA_TIEMPO
    5001,
    'EMAIL',
    'SLA_EXCEDIDO',
    3, 3, 1,
    true, false, false,
    12.0,
    1
FROM smr_fact_ejecucion fe
WHERE fe.excede_sla = 1;


-- =============================================================================
-- 15. smr_agg_resumen_diario  — Recalculo completo desde smr_fact_ejecucion
-- =============================================================================
INSERT INTO smr_agg_resumen_diario (
    smr_dim_fecha_fecha_key,
    smr_dim_proceso_proceso_key,
    total_ejecuciones,
    ejecuciones_exitosas,
    ejecuciones_fallidas,
    ejecuciones_con_warning,
    ejecuciones_con_reintento,
    total_registros_procesados,
    total_registros_exitosos,
    total_registros_fallidos,
    porcentaje_exito_promedio,
    duracion_promedio_minutos,
    duracion_minima_minutos,
    duracion_maxima_minutos,
    duracion_total_minutos,
    throughput_promedio_rps,
    porcentaje_calidad_promedio,
    total_rechazos_calidad,
    ejecuciones_cumplen_sla,
    ejecuciones_exceden_sla,
    porcentaje_cumplimiento_sla,
    costo_total_dia_usd,
    smr_organizacion_organizacion_id
)
SELECT
    fe.smr_dim_fecha_fecha_key,
    fe.smr_dim_proceso_proceso_key,
    COUNT(*)                                                                    AS total_ejecuciones,
    SUM(fe.indicador_exito)                                                     AS ejecuciones_exitosas,
    SUM(fe.indicador_error)                                                     AS ejecuciones_fallidas,
    SUM(fe.indicador_warning)                                                   AS ejecuciones_con_warning,
    SUM(fe.requiere_reintento)                                                  AS ejecuciones_con_reintento,
    SUM(fe.numero_registros_procesados)                                         AS total_registros_procesados,
    SUM(fe.numero_registros_exitosos)                                           AS total_registros_exitosos,
    SUM(fe.numero_registros_fallidos)                                           AS total_registros_fallidos,
    ROUND(AVG(fe.porcentaje_exito)::numeric, 2)                                AS porcentaje_exito_promedio,
    ROUND(AVG(fe.duracion_minutos)::numeric, 2)                                AS duracion_promedio_minutos,
    MIN(fe.duracion_minutos)                                                    AS duracion_minima_minutos,
    MAX(fe.duracion_minutos)                                                    AS duracion_maxima_minutos,
    SUM(fe.duracion_minutos)                                                    AS duracion_total_minutos,
    ROUND(AVG(fe.throughput_registros_por_segundo)::numeric, 2)                AS throughput_promedio_rps,
    ROUND(AVG(fe.porcentaje_exito)::numeric, 2)                                AS porcentaje_calidad_promedio,
    SUM(fe.numero_registros_rechazados)                                         AS total_rechazos_calidad,
    SUM(CASE WHEN fe.excede_sla = 0 AND fe.indicador_exito = 1 THEN 1 ELSE 0 END)
                                                                                AS ejecuciones_cumplen_sla,
    SUM(fe.excede_sla)                                                          AS ejecuciones_exceden_sla,
    ROUND((SUM(CASE WHEN fe.excede_sla = 0 AND fe.indicador_exito = 1 THEN 1 ELSE 0 END)::numeric
           / NULLIF(COUNT(*), 0) * 100)::numeric, 2)                            AS porcentaje_cumplimiento_sla,
    SUM(fe.costo_estimado_usd)                                                  AS costo_total_dia_usd,
    1
FROM smr_fact_ejecucion fe
GROUP BY fe.smr_dim_fecha_fecha_key, fe.smr_dim_proceso_proceso_key;


-- =============================================================================
-- 16. smr_agg_resumen_punto_venta  — Desde smr_fact_lote por punto de venta
--     Para simplificar: se distribuyen los lotes entre los primeros 5 PV
-- =============================================================================
INSERT INTO smr_agg_resumen_punto_venta (
    smr_dim_fecha_fecha_key,
    smr_dim_punto_venta_punto_venta_key,
    total_ejecuciones,
    ejecuciones_exitosas,
    ejecuciones_fallidas,
    total_lotes_procesados,
    total_lotes_exitosos,
    total_lotes_fallidos,
    total_registros_procesados,
    total_registros_exitosos,
    total_registros_fallidos,
    porcentaje_exito_promedio,
    smr_organizacion_organizacion_id
)
WITH lotes_por_pv AS (
    -- Distribuir lotes entre las tiendas de la dimension
    SELECT
        fl.smr_dim_fecha_fecha_key,
        -- Asignar lotes ciclicamente a los 5 primeros puntos de venta
        CASE (fl.numero_lote % 5)
            WHEN 0 THEN 4001   -- T001 (desde datos_iniciales)
            WHEN 1 THEN 4002   -- T002
            WHEN 2 THEN 4010   -- BAQ001
            WHEN 3 THEN 4013   -- MDE001
            ELSE       4015    -- CLO001
        END                                                                     AS punto_venta_key,
        fl.lote_exitoso,
        fl.lote_fallido,
        fl.numero_registros_lote,
        fl.numero_registros_exitosos,
        fl.numero_registros_fallidos
    FROM smr_fact_lote fl
)
SELECT
    l.smr_dim_fecha_fecha_key,
    l.punto_venta_key,
    1                                                                            AS total_ejecuciones,
    1                                                                            AS ejecuciones_exitosas,
    0                                                                            AS ejecuciones_fallidas,
    COUNT(*)                                                                     AS total_lotes_procesados,
    SUM(l.lote_exitoso)                                                         AS total_lotes_exitosos,
    SUM(l.lote_fallido)                                                         AS total_lotes_fallidos,
    SUM(l.numero_registros_lote)                                                AS total_registros_procesados,
    SUM(l.numero_registros_exitosos)                                            AS total_registros_exitosos,
    SUM(l.numero_registros_fallidos)                                            AS total_registros_fallidos,
    ROUND((SUM(l.numero_registros_exitosos)::numeric /
           NULLIF(SUM(l.numero_registros_lote), 0) * 100)::numeric, 2)         AS porcentaje_exito_promedio,
    1
FROM lotes_por_pv l
GROUP BY l.smr_dim_fecha_fecha_key, l.punto_venta_key;


-- =============================================================================
-- VERIFICACION FINAL
-- =============================================================================
DO $$
DECLARE
    v_dim_fecha         BIGINT;
    v_dim_tiempo        BIGINT;
    v_dim_status        BIGINT;
    v_dim_fuente        BIGINT;
    v_dim_destino       BIGINT;
    v_dim_pv            BIGINT;
    v_dim_usuario       BIGINT;
    v_dim_tipo_error    BIGINT;
    v_dim_proceso       BIGINT;
    v_fact_ejecucion    BIGINT;
    v_fact_lote         BIGINT;
    v_fact_error        BIGINT;
    v_fact_sla          BIGINT;
    v_fact_alerta       BIGINT;
    v_agg_diario        BIGINT;
    v_agg_pv            BIGINT;
BEGIN
    SELECT COUNT(*) INTO v_dim_fecha      FROM smr_dim_fecha;
    SELECT COUNT(*) INTO v_dim_tiempo     FROM smr_dim_tiempo;
    SELECT COUNT(*) INTO v_dim_status     FROM smr_dim_status;
    SELECT COUNT(*) INTO v_dim_fuente     FROM smr_dim_fuente;
    SELECT COUNT(*) INTO v_dim_destino    FROM smr_dim_destino;
    SELECT COUNT(*) INTO v_dim_pv         FROM smr_dim_punto_venta;
    SELECT COUNT(*) INTO v_dim_usuario    FROM smr_dim_usuario;
    SELECT COUNT(*) INTO v_dim_tipo_error FROM smr_dim_tipo_error;
    SELECT COUNT(*) INTO v_dim_proceso    FROM smr_dim_proceso;
    SELECT COUNT(*) INTO v_fact_ejecucion FROM smr_fact_ejecucion;
    SELECT COUNT(*) INTO v_fact_lote      FROM smr_fact_lote;
    SELECT COUNT(*) INTO v_fact_error     FROM smr_fact_error;
    SELECT COUNT(*) INTO v_fact_sla       FROM smr_fact_sla;
    SELECT COUNT(*) INTO v_fact_alerta    FROM smr_fact_alerta;
    SELECT COUNT(*) INTO v_agg_diario     FROM smr_agg_resumen_diario;
    SELECT COUNT(*) INTO v_agg_pv         FROM smr_agg_resumen_punto_venta;

    RAISE NOTICE '==============================================';
    RAISE NOTICE '  CARGA MODELO ESTRELLA - SCANNTECH v4.0';
    RAISE NOTICE '==============================================';
    RAISE NOTICE '  DIMENSIONES';
    RAISE NOTICE '    smr_dim_fecha         : % filas',  v_dim_fecha;
    RAISE NOTICE '    smr_dim_tiempo        : % filas',  v_dim_tiempo;
    RAISE NOTICE '    smr_dim_status        : % filas',  v_dim_status;
    RAISE NOTICE '    smr_dim_fuente        : % filas',  v_dim_fuente;
    RAISE NOTICE '    smr_dim_destino       : % filas',  v_dim_destino;
    RAISE NOTICE '    smr_dim_punto_venta   : % filas',  v_dim_pv;
    RAISE NOTICE '    smr_dim_usuario       : % filas',  v_dim_usuario;
    RAISE NOTICE '    smr_dim_tipo_error    : % filas',  v_dim_tipo_error;
    RAISE NOTICE '    smr_dim_proceso       : % filas',  v_dim_proceso;
    RAISE NOTICE '  HECHOS';
    RAISE NOTICE '    smr_fact_ejecucion    : % filas',  v_fact_ejecucion;
    RAISE NOTICE '    smr_fact_lote         : % filas',  v_fact_lote;
    RAISE NOTICE '    smr_fact_error        : % filas',  v_fact_error;
    RAISE NOTICE '    smr_fact_sla          : % filas',  v_fact_sla;
    RAISE NOTICE '    smr_fact_alerta       : % filas',  v_fact_alerta;
    RAISE NOTICE '  AGREGADAS';
    RAISE NOTICE '    smr_agg_resumen_diario      : % filas', v_agg_diario;
    RAISE NOTICE '    smr_agg_resumen_punto_venta : % filas', v_agg_pv;
    RAISE NOTICE '==============================================';
END;
$$;
