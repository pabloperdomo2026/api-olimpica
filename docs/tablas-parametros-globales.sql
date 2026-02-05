CREATE TABLE smr_punto_venta (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organizacion_id UUID NOT NULL,
    codigo_tienda VARCHAR(50) NOT NULL,
    nombre_tienda VARCHAR(255) NOT NULL,
    ciudad VARCHAR(100),
    direccion VARCHAR(255),
    activo CHAR(1) DEFAULT 'S' CHECK (activo IN ('S', 'N')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_modificacion VARCHAR(100),
    usuario_creacion VARCHAR(100),
    CONSTRAINT fk_punto_venta_organizacion FOREIGN KEY (organizacion_id) REFERENCES smr_organizacion(id)
);