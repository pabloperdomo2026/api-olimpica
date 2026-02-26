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

  v_resumen := FORMAT(
    '[%s] Modelo estrella cargado: smr_dim_fecha=%s filas | smr_dim_tiempo=%s filas',
    TO_CHAR(NOW(), 'DD/MM/YYYY HH24:MI:SS'),
    v_filas_fecha,
    v_filas_tiempo
  );

  RAISE NOTICE '%', v_resumen;
  RETURN v_resumen;
END;
$$;
