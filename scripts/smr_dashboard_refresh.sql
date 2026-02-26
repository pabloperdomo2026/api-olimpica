-- =============================================================================
-- Procedimiento: smr_dashboard_refresh
-- Descripcion : Calcula los KPIs del dashboard para el dia actual
--               (ejecuciones totales, exitosas, fallidas, en proceso y
--               tasa de exito) y devuelve un resumen en texto.
-- Uso         : SELECT smr_dashboard_refresh();
-- =============================================================================

CREATE OR REPLACE FUNCTION smr_dashboard_refresh()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  v_total        INTEGER;
  v_exitosas     INTEGER;
  v_fallidas     INTEGER;
  v_en_proceso   INTEGER;
  v_tasa_exito   NUMERIC(5,2);
  v_resumen      TEXT;
BEGIN
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

  -- =============================================================================
  -- 1. smr_dim_fecha  — 2 anos: 2025-01-01 al 2026-12-31
  --    Incluye festivos Colombia (Ley 51/1983)
  -- =============================================================================
  INSERT INTO smr_dm_dim_fecha (
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
  -- SELECT
  --   COUNT(*)                                                                  AS total,
  --   COUNT(*) FILTER (WHERE sp.es_exitoso = TRUE)                             AS exitosas,
  --   COUNT(*) FILTER (WHERE sp.es_error   = TRUE)                             AS fallidas,
  --   COUNT(*) FILTER (WHERE sp.es_exitoso = FALSE AND sp.es_error = FALSE)    AS en_proceso
  -- INTO v_total, v_exitosas, v_fallidas, v_en_proceso
  -- FROM smr_ejecucion_proceso ep
  -- JOIN smr_status_proceso    sp ON ep.status_proceso_id = sp.id
  -- WHERE ep.fecha_ejecucion = CURRENT_DATE;

  -- IF (v_exitosas + v_fallidas) > 0 THEN
  --   v_tasa_exito := ROUND(
  --     (v_exitosas::NUMERIC / (v_exitosas + v_fallidas)) * 100, 2
  --   );
  -- ELSE
  --   v_tasa_exito := 0;
  -- END IF;

  -- v_resumen := FORMAT(
  --   '[%s] total=%s | exitosas=%s | fallidas=%s | en_proceso=%s | tasa_exito=%s%%',
  --   TO_CHAR(NOW(), 'DD/MM/YYYY HH24:MI:SS'),
  --   COALESCE(v_total,      0),
  --   COALESCE(v_exitosas,   0),
  --   COALESCE(v_fallidas,   0),
  --   COALESCE(v_en_proceso, 0),
  --   COALESCE(v_tasa_exito, 0)
  -- );

  -- RAISE NOTICE '%', v_resumen;
  RETURN v_resumen;
END;
$$;
