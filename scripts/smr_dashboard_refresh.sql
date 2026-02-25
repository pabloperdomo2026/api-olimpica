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
  SELECT
    COUNT(*)                                                                  AS total,
    COUNT(*) FILTER (WHERE sp.es_exitoso = TRUE)                             AS exitosas,
    COUNT(*) FILTER (WHERE sp.es_error   = TRUE)                             AS fallidas,
    COUNT(*) FILTER (WHERE sp.es_exitoso = FALSE AND sp.es_error = FALSE)    AS en_proceso
  INTO v_total, v_exitosas, v_fallidas, v_en_proceso
  FROM smr_ejecucion_proceso ep
  JOIN smr_status_proceso    sp ON ep.status_proceso_id = sp.id
  WHERE ep.fecha_ejecucion = CURRENT_DATE;

  IF (v_exitosas + v_fallidas) > 0 THEN
    v_tasa_exito := ROUND(
      (v_exitosas::NUMERIC / (v_exitosas + v_fallidas)) * 100, 2
    );
  ELSE
    v_tasa_exito := 0;
  END IF;

  v_resumen := FORMAT(
    '[%s] total=%s | exitosas=%s | fallidas=%s | en_proceso=%s | tasa_exito=%s%%',
    TO_CHAR(NOW(), 'DD/MM/YYYY HH24:MI:SS'),
    COALESCE(v_total,      0),
    COALESCE(v_exitosas,   0),
    COALESCE(v_fallidas,   0),
    COALESCE(v_en_proceso, 0),
    COALESCE(v_tasa_exito, 0)
  );

  RAISE NOTICE '%', v_resumen;
  RETURN v_resumen;
END;
$$;
