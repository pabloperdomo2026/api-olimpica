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

CREATE TABLE smr_proceso (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organizacion_id UUID NOT NULL,
    tipo_proceso_id INTEGER NOT NULL,
    nivel_criticidad_id INTEGER NOT NULL,
    codigo VARCHAR(50) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    version VARCHAR(50),
    id_workflow_cloud VARCHAR(255),
    workflow_secret VARCHAR(255),
    parametros_json TEXT,
    servicio_cloud_id INTEGER,
    es_proceso_inicial CHAR(1) DEFAULT 'N' CHECK (es_proceso_inicial IN ('S', 'N')),
    activo CHAR(1) DEFAULT 'S' CHECK (activo IN ('S', 'N')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_creacion VARCHAR(100),
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_modificacion VARCHAR(100),
    destino_id INTEGER,
    fuente_id INTEGER,
    organizacion_id1 INTEGER,
    CONSTRAINT fk_proceso_organizacion FOREIGN KEY (organizacion_id) REFERENCES smr_organizacion(id)
);

CREATE TABLE smr_rol (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    activo CHAR(1) DEFAULT 'S' CHECK (activo IN ('S', 'N')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_creacion VARCHAR(100),
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_modificacion VARCHAR(100)
);

CREATE TABLE smr_permiso (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    activo CHAR(1) DEFAULT 'S' CHECK (activo IN ('S', 'N')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_creacion VARCHAR(100),
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_modificacion VARCHAR(100)
);