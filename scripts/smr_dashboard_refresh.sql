-- =============================================================================
-- Funcion: smr_dashboard_refresh
-- Descripcion : Recarga el modelo estrella completo (TRUNCATE + INSERT)
--               para las dimensiones de fecha y tiempo.
-- Uso         : SELECT smr_dashboard_refresh();
-- =============================================================================

CREATE OR REPLACE FUNCTION smr_dashboard_refresh()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  v_filas_fecha   INTEGER;
  v_filas_tiempo  INTEGER;
  v_resumen       TEXT;
BEGIN

  -- Limpiar tablas en orden inverso (agregadas -> hechos -> dimensiones)
  TRUNCATE TABLE smr_agg_resumen_punto_venta   CASCADE;
  TRUNCATE TABLE smr_agg_resumen_diario        CASCADE;
  TRUNCATE TABLE smr_fact_alerta               CASCADE;
  TRUNCATE TABLE smr_fact_sla                  CASCADE;
  TRUNCATE TABLE smr_fact_lote                 CASCADE;
  TRUNCATE TABLE smr_fact_error                CASCADE;
  TRUNCATE TABLE smr_fact_ejecucion            CASCADE;
  TRUNCATE TABLE smr_dm_dim_tipo_error            CASCADE;
  TRUNCATE TABLE smr_dm_dim_destino               CASCADE;
  TRUNCATE TABLE smr_dm_dim_fuente                CASCADE;
  TRUNCATE TABLE smr_dm_dim_usuario               CASCADE;
  TRUNCATE TABLE smr_dm_dim_punto_venta           CASCADE;
  TRUNCATE TABLE smr_dm_dim_status                CASCADE;
  TRUNCATE TABLE smr_dm_dim_proceso               CASCADE;
  TRUNCATE TABLE smr_dm_dim_tiempo                CASCADE;
  TRUNCATE TABLE smr_dm_dim_fecha                 CASCADE;

  -- ===========================================================================
  -- 1. smr_dim_fecha — 2 anos: 2025-01-01 al 2026-12-31
  --    Incluye festivos Colombia (Ley 51/1983)
  -- ===========================================================================
  INSERT INTO smr_dm_dim_fecha (
      fecha_key, fecha, anio, mes, dia,
      trimestre, semestre, numero_semana, dia_semana,
      nombre_dia_semana, nombre_mes, nombre_trimestre,
      anio_mes, anio_trimestre,
      es_fin_semana, es_festivo, nombre_festivo, es_dia_laboral,
      periodo_fiscal, anio_fiscal, mes_fiscal
  )
  WITH
  serie AS (
      SELECT d::date AS fecha
      FROM generate_series('2025-01-01'::date, '2026-12-31'::date, '1 day') d
  ),
  festivos_fijos AS (
      SELECT * FROM (VALUES
          -- 2025
          ('2025-01-01'::date, 'Ano Nuevo'),
          ('2025-05-01'::date, 'Dia del Trabajo'),
          ('2025-07-20'::date, 'Dia de la Independencia'),
          ('2025-08-07'::date, 'Batalla de Boyaca'),
          ('2025-12-08'::date, 'Inmaculada Concepcion'),
          ('2025-12-25'::date, 'Navidad'),
          ('2025-01-06'::date, 'Reyes Magos'),
          ('2025-03-24'::date, 'San Jose'),
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
      TO_CHAR(s.fecha, 'YYYYMMDD')::numeric                                     AS fecha_key,
      s.fecha,
      EXTRACT(YEAR  FROM s.fecha)::numeric                                       AS anio,
      EXTRACT(MONTH FROM s.fecha)::numeric                                       AS mes,
      EXTRACT(DAY   FROM s.fecha)::numeric                                       AS dia,
      EXTRACT(QUARTER FROM s.fecha)::numeric                                     AS trimestre,
      CASE WHEN EXTRACT(MONTH FROM s.fecha) <= 6 THEN 1 ELSE 2 END              AS semestre,
      EXTRACT(WEEK FROM s.fecha)::numeric                                        AS numero_semana,
      CASE EXTRACT(ISODOW FROM s.fecha)::int
          WHEN 7 THEN 0 ELSE EXTRACT(ISODOW FROM s.fecha)::int END               AS dia_semana,
      CASE EXTRACT(ISODOW FROM s.fecha)::int
          WHEN 1 THEN 'Lunes' WHEN 2 THEN 'Martes' WHEN 3 THEN 'Miercoles'
          WHEN 4 THEN 'Jueves' WHEN 5 THEN 'Viernes' WHEN 6 THEN 'Sabado'
          ELSE 'Domingo' END                                                      AS nombre_dia_semana,
      CASE EXTRACT(MONTH FROM s.fecha)::int
          WHEN  1 THEN 'Enero'      WHEN  2 THEN 'Febrero'   WHEN  3 THEN 'Marzo'
          WHEN  4 THEN 'Abril'      WHEN  5 THEN 'Mayo'       WHEN  6 THEN 'Junio'
          WHEN  7 THEN 'Julio'      WHEN  8 THEN 'Agosto'     WHEN  9 THEN 'Septiembre'
          WHEN 10 THEN 'Octubre'    WHEN 11 THEN 'Noviembre'  WHEN 12 THEN 'Diciembre'
      END                                                                         AS nombre_mes,
      CASE EXTRACT(QUARTER FROM s.fecha)::int
          WHEN 1 THEN 'Q1 - Primer Trimestre'   WHEN 2 THEN 'Q2 - Segundo Trimestre'
          WHEN 3 THEN 'Q3 - Tercer Trimestre'   WHEN 4 THEN 'Q4 - Cuarto Trimestre'
      END                                                                         AS nombre_trimestre,
      TO_CHAR(s.fecha, 'YYYY-MM')                                                AS anio_mes,
      TO_CHAR(s.fecha, 'YYYY') || '-Q' || EXTRACT(QUARTER FROM s.fecha)::text   AS anio_trimestre,
      CASE WHEN EXTRACT(ISODOW FROM s.fecha) IN (6, 7) THEN 1 ELSE 0 END        AS es_fin_semana,
      CASE WHEN f.fecha IS NOT NULL THEN 1 ELSE 0 END                            AS es_festivo,
      f.nombre                                                                    AS nombre_festivo,
      CASE WHEN EXTRACT(ISODOW FROM s.fecha) NOT IN (6, 7)
                AND f.fecha IS NULL THEN 1 ELSE 0 END                            AS es_dia_laboral,
      TO_CHAR(s.fecha, 'YYYY') || '-P' || LPAD(EXTRACT(MONTH FROM s.fecha)::text, 2, '0')
                                                                                  AS periodo_fiscal,
      EXTRACT(YEAR  FROM s.fecha)::numeric                                       AS anio_fiscal,
      EXTRACT(MONTH FROM s.fecha)::numeric                                       AS mes_fiscal
  FROM serie s
  LEFT JOIN festivos_fijos f ON f.fecha = s.fecha
  ORDER BY s.fecha;

  GET DIAGNOSTICS v_filas_fecha = ROW_COUNT;

  -- ===========================================================================
  -- 2. smr_dim_tiempo — 1440 registros (24h x 60min)
  -- ===========================================================================
  INSERT INTO smr_dm_dim_tiempo (
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
          WHEN h = 0   THEN '12:' || LPAD(m::text, 2, '0') || ' AM'
          WHEN h < 12  THEN  h::text || ':' || LPAD(m::text, 2, '0') || ' AM'
          WHEN h = 12  THEN '12:' || LPAD(m::text, 2, '0') || ' PM'
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

  GET DIAGNOSTICS v_filas_tiempo = ROW_COUNT;

  -- =============================================================================
  -- 3. smr_dim_status  — Desde smr_status_proceso
  -- =============================================================================
  INSERT INTO smr_dm_dim_status (
      status_key, status_id, codigo_status, nombre_status,
      categoria_status, es_final, es_exitoso, es_error,
      permite_reintento, orden_visualizacion, color_hex,
      organizacion_id
  )
  SELECT
      ROW_NUMBER() OVER (ORDER BY sp.codigo)                                     AS status_key,
      ROW_NUMBER() OVER (ORDER BY sp.codigo)                                     AS status_id,
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
      CASE WHEN sp.es_final   THEN 1 ELSE 0 END                                  AS es_final,
      CASE WHEN sp.es_exitoso THEN 1 ELSE 0 END                                  AS es_exitoso,
      CASE WHEN sp.es_error   THEN 1 ELSE 0 END                                  AS es_error,
      CASE WHEN sp.es_error   THEN 1 ELSE 0 END                                  AS permite_reintento,
      ROW_NUMBER() OVER (ORDER BY sp.codigo)                                     AS orden_visualizacion,
      CASE sp.codigo
          WHEN 'TERMINADO'   THEN '#28a745'
          WHEN 'FALLIDO'     THEN '#dc3545'
          WHEN 'EN_PROCESO'  THEN '#007bff'
          WHEN 'CANCELADO'   THEN '#6c757d'
          WHEN 'PENDIENTE'   THEN '#ffc107'
          WHEN 'EN_PAUSA'    THEN '#fd7e14'
          ELSE '#17a2b8'
      END                                                                         AS color_hex,
      1                                                                           AS organizacion_id
  FROM smr_status_proceso sp
  WHERE sp.activo = 'S'
  ORDER BY sp.codigo;


  v_resumen := FORMAT(
    '[%s] Modelo estrella cargado: smr_dim_fecha=%s filas | smr_dim_tiempo=%s filas',
    TO_CHAR(NOW(), 'DD/MM/YYYY HH24:MI:SS'),
    v_filas_fecha,
    v_filas_tiempo
  );

  -- =============================================================================
  -- 4. smr_dim_fuente  — Desde smr_fuente_datos
  -- =============================================================================
  INSERT INTO smr_dm_dim_fuente (
      fuente_key, fuente_id, codigo_fuente, nombre_fuente,
      tipo_fuente, categoria_fuente, activo,
      organizacion_id
  )
  SELECT
      ROW_NUMBER() OVER (ORDER BY fd.codigo)                                     AS fuente_key,
      ROW_NUMBER() OVER (ORDER BY fd.codigo)                                     AS fuente_id,
      fd.codigo,
      fd.nombre,
      tf.codigo                                                                   AS tipo_fuente,
      COALESCE(tf.categoria, 'OTRO')                                             AS categoria_fuente,
      CASE WHEN fd.activo = 'S' THEN 1 ELSE 0 END,
      1                                                                           AS organizacion_id
  FROM smr_fuente_datos fd
  JOIN smr_tipo_fuente tf ON tf.id = fd.tipo_fuente_id
  WHERE fd.activo = 'S';

  -- =============================================================================
  -- 5. smr_dim_destino  — Desde smr_destino_datos
  -- =============================================================================
  INSERT INTO smr_dm_dim_destino (
      destino_key, destino_id, codigo_destino, nombre_destino,
      tipo_destino, categoria_destino, activo,
      organizacion_id
  )
  SELECT
      ROW_NUMBER() OVER (ORDER BY dd.codigo)                                     AS destino_key,
      ROW_NUMBER() OVER (ORDER BY dd.codigo)                                     AS destino_id,
      dd.codigo,
      dd.nombre,
      td.codigo                                                                   AS tipo_destino,
      COALESCE(td.categoria, 'OTRO')                                             AS categoria_destino,
      CASE WHEN dd.activo = 'S' THEN 1 ELSE 0 END,
      1                                                                           AS organizacion_id
  FROM smr_destino_datos dd
  JOIN smr_tipo_destino td ON td.id = dd.tipo_destino_id
  WHERE dd.activo = 'S';

  -- =============================================================================
  -- 6. smr_dim_punto_venta  — Desde smr_punto_venta + puntos adicionales
  -- =============================================================================
  INSERT INTO smr_dm_dim_punto_venta (
      punto_venta_key, punto_venta_id, codigo_tienda, nombre_tienda,
      region, zona, ciudad, departamento,
      tipo_tienda, tamano_tienda, fecha_apertura, activo,
      organizacion_id
  )
  SELECT
      ROW_NUMBER() OVER (ORDER BY pv.codigo_tienda)                              AS punto_venta_key,
      ROW_NUMBER() OVER (ORDER BY pv.codigo_tienda)                              AS punto_venta_id,
      pv.codigo_tienda,
      pv.nombre_tienda,
      CASE
          WHEN pv.ciudad ILIKE 'Barranquilla%' OR pv.ciudad ILIKE 'Cartagena%'
               OR pv.ciudad ILIKE 'Santa Marta%' OR pv.ciudad ILIKE 'Valledupar%' THEN 'Caribe'
          WHEN pv.ciudad ILIKE 'Medellin%' OR pv.ciudad ILIKE 'Envigado%'
               OR pv.ciudad ILIKE 'Bucaramanga%' OR pv.ciudad ILIKE 'Pereira%'
               OR pv.ciudad ILIKE 'Bogot%'                                       THEN 'Andina'
          WHEN pv.ciudad ILIKE 'Cali%' OR pv.ciudad ILIKE 'Palmira%'            THEN 'Pacifico'
          ELSE 'Otra'
      END                                                                         AS region,
      'Zona ' || pv.ciudad                                                        AS zona,
      pv.ciudad,
      CASE
          WHEN pv.ciudad ILIKE 'Barranquilla%' OR pv.ciudad ILIKE 'Soledad%'    THEN 'Atlantico'
          WHEN pv.ciudad ILIKE 'Cartagena%'                                      THEN 'Bolivar'
          WHEN pv.ciudad ILIKE 'Santa Marta%'                                    THEN 'Magdalena'
          WHEN pv.ciudad ILIKE 'Valledupar%'                                     THEN 'Cesar'
          WHEN pv.ciudad ILIKE 'Bogot%'                                          THEN 'Cundinamarca'
          WHEN pv.ciudad ILIKE 'Medellin%' OR pv.ciudad ILIKE 'Envigado%'       THEN 'Antioquia'
          WHEN pv.ciudad ILIKE 'Cali%' OR pv.ciudad ILIKE 'Palmira%'            THEN 'Valle del Cauca'
          WHEN pv.ciudad ILIKE 'Bucaramanga%'                                    THEN 'Santander'
          WHEN pv.ciudad ILIKE 'Pereira%'                                        THEN 'Risaralda'
          ELSE 'Otro'
      END                                                                         AS departamento,
      'Hipermercado'                                                              AS tipo_tienda,
      'Grande'                                                                    AS tamano_tienda,
      NULL::date                                                                  AS fecha_apertura,
      CASE WHEN pv.activo = 'S' THEN 1 ELSE 0 END,
      1                                                                           AS organizacion_id
  FROM smr_punto_venta pv
  WHERE pv.activo = 'S';

  -- Puntos de venta adicionales de ejemplo (Olimpica tiene ~70 tiendas)
  INSERT INTO smr_dm_dim_punto_venta (
      punto_venta_key, punto_venta_id, codigo_tienda, nombre_tienda,
      region, zona, ciudad, departamento,
      tipo_tienda, tamano_tienda, fecha_apertura, activo,
      organizacion_id
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
  INSERT INTO smr_dm_dim_usuario (
      usuario_key, usuario_id, username, nombre_completo,
      rol_principal, departamento, activo,
      organizacion_id
  )
  SELECT
      ROW_NUMBER() OVER (ORDER BY u.email)                                       AS usuario_key,
      ROW_NUMBER() OVER (ORDER BY u.email)                                       AS usuario_id,
      u.email,
      u.nombre || ' ' || u.apellido,
      (SELECT r.nombre FROM smr_usuario_rol ur
       JOIN smr_rol r ON r.id = ur.rol_id
       WHERE ur.usuario_id = u.id LIMIT 1)                                       AS rol_principal,
      'Tecnologia'                                                                AS departamento,
      CASE WHEN u.activo = 'S' THEN 1 ELSE 0 END,
      1                                                                           AS organizacion_id
  FROM smr_dim_usuario u
  WHERE u.activo = 'S';

  -- Usuario sistema (ejecuciones automaticas)
  INSERT INTO smr_dm_dim_usuario (
      usuario_key, usuario_id, username, nombre_completo,
      rol_principal, departamento, activo,
      organizacion_id
  ) VALUES
  (5099, 99, 'sistema', 'Proceso Automatico', 'Sistema', 'ETL Automatico', 1, 1);

  -- =============================================================================
  -- 8. smr_dim_tipo_error  — Catalogo de tipos de error ETL
  -- =============================================================================
  INSERT INTO smr_dm_dim_tipo_error (
      tipo_error_key, codigo_error, categoria_error,
      es_error_tecnico, es_error_negocio, es_error_datos, es_recuperable,
      severidad, nombre_severidad,
      organizacion_id
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
  INSERT INTO smr_dm_dim_proceso (
      proceso_key, proceso_id, codigo_proceso, nombre_proceso,
      tipo_proceso, categoria_proceso, nivel_criticidad, nivel_criticidad_numerico,
      fuente_nombre, tipo_fuente, destino_nombre, tipo_destino,
      permite_ejecucion_paralela, requiere_ventana_mantenimiento, activo,
      fecha_efectiva_desde, fecha_efectiva_hasta, es_vigente,
      organizacion_id
  )
  SELECT
      ROW_NUMBER() OVER (ORDER BY p.codigo)                                      AS proceso_key,
      ROW_NUMBER() OVER (ORDER BY p.codigo)                                      AS proceso_id,
      p.codigo,
      p.nombre,
      NULL                                                                        AS tipo_proceso,
      'VENTAS'                                                                    AS categoria_proceso,
      NULL                                                                        AS nivel_criticidad,
      p.nivel_criticidad_id                                                       AS nivel_criticidad_numerico,
      NULL                                                                        AS fuente_nombre,
      NULL                                                                        AS tipo_fuente,
      NULL                                                                        AS destino_nombre,
      NULL                                                                        AS tipo_destino,
      0                                                                           AS permite_ejecucion_paralela,
      0                                                                           AS requiere_ventana_mantenimiento,
      CASE WHEN p.activo = 'S' THEN 1 ELSE 0 END,
      NOW() - INTERVAL '90 days'                                                 AS fecha_efectiva_desde,
      NULL                                                                        AS fecha_efectiva_hasta,
      true                                                                        AS es_vigente,
      1                                                                           AS organizacion_id
  FROM smr_proceso p
  WHERE p.activo = 'S';

  -- =============================================================================
  -- 10. smr_fact_ejecucion  — 30 dias de ejecuciones simuladas
  --     Patron: 1 ejecucion por dia, mayoria exitosas, algunos fallos
  --     Proceso: ETL_VENTAS_SCANN (proceso_id=1)
  --     Horario: 04:00 AM cada dia, ~45 minutos de duracion
  -- =============================================================================
  INSERT INTO smr_fact_ejecucion (
      ejecucion_id,
      proceso_key,
      fecha_key,
      tiempo_key,
      tiempo_fin_key,
      status_key,
      usuario_key,
      fuente_key,
      destino_key,
      punto_venta_key,
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
      organizacion_id
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
      7001                                                                        AS proceso_key,  -- ETL_VENTAS_SCANN
      TO_CHAR(d.fecha_ejec, 'YYYYMMDD')::numeric                                AS fecha_key,
      400                                                                         AS tiempo_key,    -- 04:00 inicio
      CASE WHEN d.es_lento = 1 THEN 530
          WHEN d.resultado = 'FALLIDO' THEN 415
          ELSE 445 END                                                           AS tiempo_fin_key,              -- aprox 04:45
      -- status_key: TERMINADO=1003, FALLIDO=1004
      CASE WHEN d.resultado = 'FALLIDO' THEN 1004 ELSE 1003 END                 AS status_key,
      5099                                                                        AS usuario_key,  -- sistema
      2001                                                                        AS fuente_key,    -- REDSHIFT_PROD
      3001                                                                        AS destino_key,  -- SCANNTECH_API
      NULL                                                                        AS punto_venta_key, -- aplica a todas
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
      1                                                                            AS organizacion_id
  FROM dias d;

  RAISE NOTICE '%', v_resumen;
  RETURN v_resumen;
END;
$$;
