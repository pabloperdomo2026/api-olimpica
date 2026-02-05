CREATE TABLE smr_dim_usuario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organizacion_id UUID NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    activo CHAR(1) DEFAULT 'S' CHECK (activo IN ('S', 'N')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_creacion VARCHAR(100),
    usuario_modificacion VARCHAR(100)
);

CREATE TABLE smr_organizacion (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo_org VARCHAR(50) NOT NULL UNIQUE,
    nombre_org VARCHAR(255) NOT NULL,
    razon_social VARCHAR(255) NOT NULL,
    nit VARCHAR(50) NOT NULL UNIQUE,
    pais VARCHAR(100),
    ciudad VARCHAR(100),
    direccion VARCHAR(255),
    telefono_contacto VARCHAR(50),
    email_contacto VARCHAR(255),
    activo CHAR(1) DEFAULT 'S' CHECK (activo IN ('S', 'N')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_creacion VARCHAR(100),
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_modificacion VARCHAR(100),
    pertenece_a INTEGER
);