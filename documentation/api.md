# Documentacion Tecnica — api-olimpica

**Version**: 1.0
**Fecha**: Marzo 2026
**Sistema**: API REST — Gestion de Procesos ETL/ELT — Olimpica
**Stack**: NestJS 11 + TypeORM + PostgreSQL + JWT

---

## Tabla de Contenidos

1. [Vision General](#1-vision-general)
2. [Stack Tecnologico](#2-stack-tecnologico)
3. [Estructura del Proyecto](#3-estructura-del-proyecto)
4. [Arquitectura de la Aplicacion](#4-arquitectura-de-la-aplicacion)
5. [Configuracion del Entorno](#5-configuracion-del-entorno)
6. [Base de Datos](#6-base-de-datos)
7. [Autenticacion y Seguridad](#7-autenticacion-y-seguridad)
8. [Endpoints por Modulo](#8-endpoints-por-modulo)
9. [Entidades y Modelos de Datos](#9-entidades-y-modelos-de-datos)
10. [Patron de Diseno por Modulo](#10-patron-de-diseno-por-modulo)
11. [Servicios Especiales](#11-servicios-especiales)
12. [Validacion de DTOs](#12-validacion-de-dtos)
13. [Respuestas Estandarizadas](#13-respuestas-estandarizadas)
14. [Data Mart](#14-data-mart)
15. [Despliegue con Docker](#15-despliegue-con-docker)
16. [Flujos Principales](#16-flujos-principales)
17. [Variables de Entorno](#17-variables-de-entorno)
18. [Guia de Inicio Rapido](#18-guia-de-inicio-rapido)

---

## 1. Vision General

**api-olimpica** es el backend del sistema **Scanntech v4.0**, la plataforma de gestion y monitoreo de procesos ETL/ELT de Olimpica. Expone una API REST que:

- Gestiona la autenticacion y autorizacion de usuarios mediante JWT.
- Provee CRUD completo para 60+ recursos del dominio ETL.
- Registra y monitorea ejecuciones de procesos con tracking granular por lote y registro.
- Integra servicios cloud de AWS (Step Functions) para orquestacion de workflows.
- Envia notificaciones por correo electronico via Google Gmail API.
- Ejecuta jobs programados para actualizar el Data Mart (scheduler diario).
- Expone documentacion interactiva via Swagger en `/api/docs`.

### Contexto del Sistema

```
[app-olimpica — Next.js (Puerto 3000)]
    |  HTTP/REST (JWT)
    v
[api-olimpica — NestJS (Puerto 3003)]
    |
    +---> [PostgreSQL — Esquema: monitor]
    |
    +---> [AWS Step Functions]
    |
    +---> [Google Gmail API]
```

### Datos Clave

| Item | Valor |
|------|-------|
| Puerto | 3003 |
| Ruta base | `/api` |
| Documentacion Swagger | http://localhost:3003/api/docs |
| Base de datos | PostgreSQL |
| Autenticacion | JWT (Bearer Token) |
| Tablas gestionadas | 58 (40 operacionales + 18 data mart) |

---

## 2. Stack Tecnologico

| Categoria | Tecnologia | Version | Proposito |
|-----------|-----------|---------|-----------|
| Framework | NestJS | 11.0.1 | Framework Node.js enterprise |
| Lenguaje | TypeScript | 5.x | Tipado estatico |
| ORM | TypeORM | 0.3.28 | Mapeo objeto-relacional |
| Base de datos | PostgreSQL | 16 | Motor de base de datos |
| Driver BD | pg | 8.18.0 | Conector PostgreSQL para Node |
| Autenticacion | Passport + JWT | — | Estrategia JWT |
| Encriptacion | bcrypt | 6.0.0 | Hash de contrasenas |
| Validacion | class-validator | 0.14.3 | Validacion de DTOs |
| Transformacion | class-transformer | 0.5.1 | Transformacion de DTOs |
| Email | googleapis | 171.4.0 | Gmail API (OAuth2) |
| Email transporte | nodemailer | 8.0.1 | Envio SMTP |
| Scheduler | @nestjs/schedule | 6.1.1 | Jobs con cron |
| Cloud AWS | @aws-sdk/client-sfn | 3.984.0 | AWS Step Functions |
| Documentacion | @nestjs/swagger | 11.2.6 | Swagger / OpenAPI |
| Testing | Jest | — | Pruebas unitarias y e2e |
| Contenedor | Docker | — | Despliegue produccion |

### Dependencias Principales

```json
{
  "@nestjs/common": "^11.0.1",
  "@nestjs/core": "^11.0.1",
  "@nestjs/config": "^4.0.2",
  "@nestjs/jwt": "^11.0.2",
  "@nestjs/passport": "^11.0.5",
  "@nestjs/typeorm": "^11.0.0",
  "@nestjs/schedule": "^6.1.1",
  "@nestjs/swagger": "^11.2.6",
  "@aws-sdk/client-sfn": "^3.984.0",
  "typeorm": "^0.3.28",
  "pg": "^8.18.0",
  "bcrypt": "^6.0.0",
  "class-validator": "^0.14.3",
  "class-transformer": "^0.5.1",
  "googleapis": "^171.4.0",
  "passport-jwt": "^4.0.1"
}
```

---

## 3. Estructura del Proyecto

```
api-olimpica/
|
+-- src/                                       # Codigo fuente TypeScript
|   |
|   +-- main.ts                                # Punto de entrada — configura NestJS
|   +-- app.module.ts                          # Modulo raiz — registra los 41 modulos
|   |
|   +-- database/                             # Configuracion de base de datos
|   |   +-- database.config.ts               # Configuracion TypeORM
|   |   +-- database.module.ts               # Modulo global de BD
|   |
|   +-- health/                              # Health check
|   |   +-- health.controller.ts            # GET /api/health
|   |   +-- health.module.ts
|   |
|   +-- autenticacion/                       # Modulo de autenticacion completo
|   |   +-- autenticacion.controller.ts      # Endpoints /api/auth/*
|   |   +-- autenticacion.module.ts
|   |   +-- estrategias/
|   |   |   +-- jwt.strategy.ts             # Validacion de tokens JWT
|   |   +-- guards/
|   |   |   +-- jwt-auth.guard.ts           # Guard para rutas protegidas
|   |   +-- servicios/
|   |   |   +-- correo.service.ts           # Envio de OTP por Google Gmail API
|   |   +-- casos-de-uso/
|   |   |   +-- solicitar-otp.use-case.ts   # Genera y guarda OTP (4 digitos)
|   |   |   +-- verificar-otp.use-case.ts   # Valida OTP (TTL 10 min)
|   |   |   +-- actualizar-contrasena.use-case.ts
|   |   +-- dtos/
|   |   |   +-- solicitar-otp.dto.ts
|   |   |   +-- verificar-otp.dto.ts
|   |   |   +-- actualizar-contrasena.dto.ts
|   |   +-- entities/
|   |   |   +-- otp.entity.ts              # Tabla temporal de OTPs
|   |   +-- repositories/
|   |       +-- otp.repository.ts
|   |
|   +-- orquestacion/                        # Modulo de login
|   |   +-- casos-de-uso/
|   |   |   +-- login.use-case.ts           # Validacion credenciales + emision JWT
|   |   +-- dtos/
|   |   |   +-- sign-in.dto.ts
|   |   +-- orquestacion.module.ts
|   |
|   +-- usuario/                             # CRUD Usuarios
|   |   +-- usuario.entity.ts               # Entidad smr_dim_usuario
|   |   +-- usuario.controller.ts
|   |   +-- usuario.service.ts
|   |   +-- usuario.repository.ts
|   |   +-- usuario.module.ts
|   |   +-- casos-de-uso/                   # crear, listar, actualizar, eliminar
|   |   +-- dtos/
|   |   +-- interfaces/
|   |   +-- mappers/
|   |
|   +-- organizacion/                        # CRUD Organizaciones
|   +-- proceso/                             # CRUD Procesos ETL
|   +-- punto-venta/                         # CRUD Puntos de Venta
|   +-- rol/                                 # CRUD Roles
|   +-- permiso/                             # CRUD Permisos
|   +-- rol-permiso/                         # Relacion Rol - Permiso
|   +-- usuario-rol/                         # Relacion Usuario - Rol
|   |
|   +-- fuente-datos/                        # CRUD Fuentes de Datos (Redshift, Oracle, etc.)
|   +-- destino-datos/                       # CRUD Destinos de Datos (Scanntech API, etc.)
|   +-- columna-origen/                      # CRUD Columnas de Origen
|   +-- columna-destino/                     # CRUD Columnas de Destino
|   +-- proceso-mapeo-campo/                 # Mapeos Origen -> Destino
|   +-- proceso-dependencia/                 # Dependencias entre procesos
|   |
|   +-- programacion/                        # CRUD Programaciones (cron, manual, etc.)
|   +-- configuracion-alerta/                # CRUD Configuracion de Alertas
|   +-- configuracion-sla/                   # CRUD Configuracion de SLA
|   +-- configuracion-reintento/             # Configuracion de Reintentos (backoff)
|   |
|   +-- ejecucion-proceso/                   # Ejecuciones de procesos ETL
|   |   +-- ejecucion-proceso.entity.ts
|   |   +-- ejecucion-proceso.controller.ts  # Incluye endpoint /dashboard
|   |   +-- ejecucion-proceso.service.ts
|   |   +-- ejecucion-proceso.repository.ts
|   |   +-- ejecucion-proceso.module.ts
|   |   +-- casos-de-uso/
|   |   +-- dtos/
|   |   |   +-- crear-ejecucion-proceso.dto.ts
|   |   +-- interfaces/
|   |   |   +-- ejecucion-proceso-response.interface.ts
|   |   |   +-- dashboard-response.interface.ts
|   |   +-- mappers/
|   |
|   +-- ejecucion-lote/                      # Tracking de lotes (350 registros)
|   +-- ejecucion-paso/                      # Pasos: Extract, Transform, Validate, Load
|   +-- ejecucion-detalle-registro/          # Registros fallidos con datos JSON
|   |
|   +-- dashboard/                           # Scheduler del dashboard
|   |   +-- dashboard.module.ts
|   |   +-- dashboard.scheduler.ts           # Cron job diario a las 10 AM
|   |
|   +-- proveedor-cloud/                     # CRUD Proveedores Cloud (AWS, Azure, GCP)
|   +-- servicio-cloud/                      # CRUD Servicios Cloud (Lambda, SFN, etc.)
|   +-- parametros-globales/                 # CRUD Parametros Globales por organizacion
|   |
|   +-- calendario/                          # CRUD Calendario y dias festivos
|   +-- moneda/                              # CRUD Monedas
|   +-- tasa-cambio/                         # CRUD Tasas de Cambio
|   +-- recipiente-correo/                   # CRUD Destinatarios de Correo
|   |
|   +-- tipo-proceso/                        # Catalogo tipos de proceso
|   +-- tipo-dato/                           # Catalogo tipos de dato
|   +-- tipo-fuente/                         # Catalogo tipos de fuente
|   +-- tipo-destino/                        # Catalogo tipos de destino
|   +-- tipo-alerta/                         # Catalogo tipos de alerta
|   +-- tipo-programacion/                   # Catalogo tipos de programacion
|   +-- nivel-criticidad/                    # Catalogo niveles de criticidad
|   +-- status-proceso/                      # Catalogo estados de proceso
|   +-- mensaje-error/                       # Catalogo mensajes de error
|   +-- funciones-sistema/                   # Catalogo funciones del sistema
|   |
|   +-- log-proceso/                         # Logs de ejecuciones
|   +-- log-cloud/                           # Logs de servicios cloud
|   +-- incidencia-error/                    # Registro de incidencias
|   +-- alerta-enviada/                      # Historial de alertas enviadas
|   +-- reintento-ejecucion/                 # Historial de reintentos
|   |
|   +-- dm-dim-fecha/                        # Data Mart — Dimension Fecha
|   +-- dm-dim-tiempo/                       # Data Mart — Dimension Tiempo
|   +-- dm-dim-proceso/                      # Data Mart — Dimension Proceso (SCD Tipo 2)
|   +-- dm-dim-status/                       # Data Mart — Dimension Estado
|   +-- dm-dim-punto-venta/                  # Data Mart — Dimension Punto de Venta
|   +-- dm-dim-usuario/                      # Data Mart — Dimension Usuario
|   +-- dm-dim-fuente/                       # Data Mart — Dimension Fuente
|   +-- dm-dim-destino/                      # Data Mart — Dimension Destino
|   +-- dm-dim-tipo-error/                   # Data Mart — Dimension Tipo de Error
|   +-- dm-fact-ejecucion/                   # Data Mart — Hechos Ejecuciones
|   +-- dm-fact-error/                       # Data Mart — Hechos Errores
|   +-- dm-fact-lote/                        # Data Mart — Hechos Lotes
|   +-- dm-fact-sla/                         # Data Mart — Hechos SLA
|   +-- dm-fact-alerta/                      # Data Mart — Hechos Alertas
|   +-- dm-agg-resumen-diario/               # Data Mart — Agregado Diario
|   +-- dm-agg-resumen-punto-venta/          # Data Mart — Agregado por Tienda
|   |
|   +-- utils/                               # Utilidades compartidas
|
+-- scripts/
|   +-- smr_dashboard_refresh.sql           # Procedimiento SQL del scheduler
|
+-- test/                                    # Tests end-to-end
+-- dist/                                    # Codigo compilado (generado)
+-- docs/                                    # Documentacion
|
+-- Dockerfile                              # Imagen Docker
+-- docker-compose.yml                      # Compose con PostgreSQL + API
+-- package.json
+-- tsconfig.json
+-- tsconfig.build.json
+-- nest-cli.json
+-- .env                                     # Variables de entorno (no subir a git)
+-- .env.example
+-- .gitignore
+-- README.md
```

**Metricas del proyecto:**

| Item | Cantidad |
|------|----------|
| Modulos NestJS | 41 |
| Endpoints REST | 200+ |
| Entidades TypeORM | 58 |
| Casos de uso | 150+ |
| DTOs | 100+ |

---

## 4. Arquitectura de la Aplicacion

### Arquitectura Limpia por Capas

Cada modulo del dominio sigue una arquitectura limpia (hexagonal) con separacion estricta de responsabilidades:

```
+--------------------------------------------------------+
|          CONTROLADOR (Controller)                      |
|   Recibe peticiones HTTP                               |
|   Valida autenticacion (JwtAuthGuard)                  |
|   Delega en el Service                                 |
|   Retorna respuesta HTTP                               |
+------------------------+-------------------------------+
                         | delega en
+------------------------v-------------------------------+
|          SERVICIO (Service)                            |
|   Orquesta los casos de uso                           |
|   Maneja logica de coordinacion                       |
+------------------------+-------------------------------+
                         | ejecuta
+------------------------v-------------------------------+
|          CASO DE USO (Use Case)                        |
|   Logica de negocio pura                              |
|   Valida reglas del dominio                           |
|   Llama al Repository                                 |
+------------------------+-------------------------------+
                         | accede via
+------------------------v-------------------------------+
|          REPOSITORIO (Repository)                      |
|   Abstraccion de acceso a datos                       |
|   Usa TypeORM EntityManager / Repository              |
+------------------------+-------------------------------+
                         | persiste en
+------------------------v-------------------------------+
|          ENTIDAD (Entity)                              |
|   TypeORM @Entity                                     |
|   Mapea a tabla PostgreSQL                            |
+--------------------------------------------------------+
```

### Patron por Modulo

Cada modulo del dominio contiene:

```
nombre-modulo/
+-- nombre-modulo.entity.ts         # @Entity TypeORM -> tabla en DB
+-- nombre-modulo.controller.ts     # @Controller con @Get, @Post, etc.
+-- nombre-modulo.service.ts        # @Injectable — orquesta use cases
+-- nombre-modulo.repository.ts     # @Injectable — acceso a datos
+-- nombre-modulo.module.ts         # @Module — inyeccion de dependencias
+-- casos-de-uso/
|   +-- crear-nombre.use-case.ts
|   +-- listar-nombres.use-case.ts
|   +-- actualizar-nombre.use-case.ts
|   +-- eliminar-nombre.use-case.ts
+-- dtos/
|   +-- crear-nombre.dto.ts         # class-validator decorators
|   +-- actualizar-nombre.dto.ts
+-- interfaces/
|   +-- nombre-response.interface.ts
+-- mappers/
    +-- nombre.mapper.ts            # Entity -> Response Interface
```

### Inyeccion de Dependencias

NestJS maneja la inyeccion de dependencias via decoradores:

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([NombreEntity])],
  controllers: [NombreController],
  providers: [
    NombreService,
    NombreRepository,
    CrearNombreUseCase,
    ListarNombresUseCase,
    ActualizarNombreUseCase,
    EliminarNombreUseCase,
  ],
  exports: [NombreService],
})
export class NombreModule {}
```

---

## 5. Configuracion del Entorno

### Punto de Entrada — main.ts

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global para todas las rutas
  app.setGlobalPrefix('api');

  // CORS habilitado para el frontend
  app.enableCors();

  // Validacion global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Elimina campos no declarados en DTO
      forbidNonWhitelisted: true, // Lanza error si hay campos extras
      transform: true,            // Convierte tipos automaticamente
    }),
  );

  // Configuracion de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Olimpica — Scanntech v4.0')
    .setDescription('API REST para gestion de procesos ETL')
    .setVersion('4.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 3003);
}
```

### Configuracion TypeScript — tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "paths": {
      "src/*": ["src/*"]
    },
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

**Notas importantes**:
- `experimentalDecorators: true` — requerido para los decoradores de NestJS y TypeORM.
- `emitDecoratorMetadata: true` — requerido para la inyeccion de dependencias de NestJS.
- `strict: true` — tipado estricto habilitado.

---

## 6. Base de Datos

### Configuracion TypeORM — database.config.ts

```typescript
TypeORM.createDataSource({
  type: 'postgres',
  host: process.env.DB_HOST,           // localhost
  port: parseInt(process.env.DB_PORT), // 5432
  username: process.env.DB_USERNAME,   // postgres
  password: process.env.DB_PASSWORD,   // postgres123
  database: process.env.DB_DATABASE,   // api_db
  schema: process.env.DB_SCHEMA,       // monitor (en produccion)
  synchronize: true,                   // Auto-sincroniza schema con entidades
  logging: false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
})
```

**IMPORTANTE — `synchronize: true`**:
- En desarrollo: TypeORM crea/altera tablas automaticamente al iniciar.
- En produccion: Cambiar a `false` y usar migraciones manuales para evitar perdida de datos.

### Nombramiento de Tablas

Todas las entidades mapean a tablas con el prefijo `smr_` (Sistema de Monitoreo y Registro):

| Entidad TypeORM | Tabla PostgreSQL |
|-----------------|-----------------|
| `UsuarioEntity` | `smr_dim_usuario` |
| `OrganizacionEntity` | `smr_organizacion` |
| `ProcesoEntity` | `smr_proceso` |
| `EjecucionProcesoEntity` | `smr_ejecucion_proceso` |
| `EjecucionLoteEntity` | `smr_ejecucion_lote` |
| `PuntoVentaEntity` | `smr_punto_venta` |
| Dimensiones | `smr_dim_*` |
| Hechos | `smr_fact_*` |
| Agregados | `smr_agg_*` |

### Campos de Auditoria (Comunes a Todas las Entidades)

```typescript
@Column({ name: 'activo', default: 'S' })
activo: string;   // 'S' = activo, 'N' = inactivo (eliminacion logica)

@CreateDateColumn({ name: 'fecha_creacion' })
fechaCreacion: Date;

@UpdateDateColumn({ name: 'fecha_modificacion' })
fechaModificacion: Date;

@Column({ name: 'usuario_creacion', nullable: true })
usuarioCreacion: string;

@Column({ name: 'usuario_modificacion', nullable: true })
usuarioModificacion: string;
```

---

## 7. Autenticacion y Seguridad

### Mecanismo JWT

La API usa **JWT (JSON Web Token)** con la libreria `@nestjs/jwt` + `passport-jwt`.

**Configuracion**:
```typescript
JwtModule.registerAsync({
  useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get<string>('JWT_EXPIRATION'), // '1d'
    },
  }),
  inject: [ConfigService],
})
```

### Payload del Token

```typescript
interface JwtPayload {
  sub: string;           // ID del usuario (UUID)
  email: string;         // Email del usuario
  organizacionId: string;// ID de la organizacion
  iat?: number;          // Issued At (automatico)
  exp?: number;          // Expiration (automatico)
}
```

### Estrategia JWT — jwt.strategy.ts

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
      organizacionId: payload.organizacionId,
    };
  }
}
```

### Guard JWT — jwt-auth.guard.ts

Se aplica a todos los endpoints protegidos:

```typescript
@UseGuards(JwtAuthGuard)
```

O de forma global (en `app.module.ts`).

### Flujo de Autenticacion

```
1. Cliente: POST /api/auth/login { email, password }
                |
2. LoginUseCase: Busca usuario por email en DB
                |
3. LoginUseCase: Compara password con bcrypt.compare()
                |
4. LoginUseCase: Genera JWT con JwtService.sign(payload)
                |
5. Response: { accessToken: "eyJ...", usuario: { id, email, nombre } }
                |
6. Cliente: Authorization: Bearer eyJ...
                |
7. JwtStrategy.validate(): Extrae y valida payload
                |
8. Request.user = { userId, email, organizacionId }
```

### Encriptacion de Contrasenas

Se usa **bcrypt** con factor de coste 10 (por defecto):

```typescript
// Al crear usuario:
const hash = await bcrypt.hash(password, 10);

// Al verificar:
const valido = await bcrypt.compare(passwordIngresado, hashGuardado);
```

---

## 8. Endpoints por Modulo

### Convencion de Respuesta

Todas las respuestas exitosas siguen la estructura:

```typescript
// Recurso unico
{
  data: { /* objeto */ },
  message: "Operacion exitosa"
}

// Lista
{
  data: [ /* array */ ],
  message: "Operacion exitosa"
}
```

---

### A. Autenticacion — `/api/auth`

No requiere autenticacion JWT.

| Metodo | Endpoint | Descripcion | Body |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Iniciar sesion | `{ email, password }` |
| POST | `/api/auth/olvidar-contrasena` | Solicitar OTP por correo | `{ correo }` |
| POST | `/api/auth/verificar-otp` | Verificar codigo OTP | `{ correo, codigo }` |
| POST | `/api/auth/actualizar-contrasena` | Actualizar contrasena | `{ correo, codigo, nuevaContrasena }` |

**POST /api/auth/login**

Request:
```json
{
  "email": "admin@olimpica.com",
  "password": "admin123"
}
```

Response 200:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "uuid-del-usuario",
    "email": "admin@olimpica.com",
    "nombre": "Administrador",
    "apellido": "Olimpica",
    "organizacionId": "uuid-de-organizacion"
  }
}
```

Response 401:
```json
{
  "statusCode": 401,
  "message": "Credenciales invalidas",
  "error": "Unauthorized"
}
```

---

### B. Health Check — `/api/health`

| Metodo | Endpoint | Descripcion | Auth |
|--------|----------|-------------|------|
| GET | `/api/health` | Estado de la API | No |

Response 200:
```json
{
  "status": "ok",
  "timestamp": "2026-03-04T10:00:00.000Z"
}
```

---

### C. Usuarios — `/api/usuarios`

Requiere: `Authorization: Bearer {token}`

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| POST | `/api/usuarios` | Crear usuario |
| GET | `/api/usuarios` | Listar todos los usuarios |
| PUT | `/api/usuarios/:id` | Actualizar usuario |
| DELETE | `/api/usuarios/:id` | Eliminar usuario |

**CrearUsuarioDto**:
```typescript
{
  organizacionId?: string;  // UUID (opcional)
  email: string;            // Unico, requerido. Ej: "admin@olimpica.com"
  password: string;         // Requerido, min 6 caracteres
  nombre: string;           // Requerido
  apellido?: string;        // Opcional
}
```

---

### D. Organizaciones — `/api/organizaciones`

Requiere: `Authorization: Bearer {token}`

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| POST | `/api/organizaciones` | Crear organizacion |
| GET | `/api/organizaciones` | Listar todas |
| GET | `/api/organizaciones/:id` | Obtener por ID |
| PUT | `/api/organizaciones/:id` | Actualizar |
| DELETE | `/api/organizaciones/:id` | Eliminar |

**CrearOrganizacionDto**:
```typescript
{
  codigoOrg: string;         // Unico. Ej: "OLIMPICA"
  nombreOrg: string;         // Nombre de la organizacion
  razonSocial: string;       // Razon social legal
  nit: string;               // NIT unico. Ej: "800123456-7"
  pais?: string;             // Ej: "Colombia"
  ciudad?: string;           // Ej: "Bogota"
  direccion?: string;
  telefonoContacto?: string;
  emailContacto?: string;
}
```

---

### E. Procesos ETL — `/api/procesos`

Requiere: `Authorization: Bearer {token}`

| Metodo | Endpoint | Descripcion | Query Params |
|--------|----------|-------------|--------------|
| POST | `/api/procesos` | Crear proceso ETL | — |
| GET | `/api/procesos` | Listar procesos | `organizacionId` (opcional) |
| GET | `/api/procesos/:id` | Obtener por ID | — |
| PUT | `/api/procesos/:id` | Actualizar | — |
| DELETE | `/api/procesos/:id` | Eliminar | — |

**CrearProcesoDto**:
```typescript
{
  organizacionId: string;      // UUID, requerido
  tipoProcesoId: number;       // FK a catalogo tipos_proceso
  nivelCriticidadId: number;   // FK a catalogo nivel_criticidad
  codigo: string;              // Unico, max 50. Ej: "ETL-VENTAS-001"
  nombre: string;              // Max 255. Ej: "Carga Ventas Diarias"
  descripcion?: string;        // Descripcion detallada
  version?: string;            // Ej: "1.0.0"
  idWorkflowCloud?: string;    // ARN de Step Function u otro ID cloud
  workflowSecret?: string;     // Credenciales encriptadas del workflow
  parametrosJson?: string;     // JSON con configuracion adicional
  servicioCloudId?: number;    // FK a servicio_cloud
  esProcesoInicial?: boolean;  // true si es el primer proceso de la cadena
  destinoId?: number;          // FK a destino_datos
  fuenteId?: number;           // FK a fuente_datos
}
```

---

### F. Ejecuciones — `/api/ejecuciones`

Requiere: `Authorization: Bearer {token}`

| Metodo | Endpoint | Descripcion | Query Params |
|--------|----------|-------------|--------------|
| POST | `/api/ejecuciones` | Crear ejecucion | — |
| POST | `/api/ejecuciones/eventos` | Registrar evento de progreso | — |
| POST | `/api/ejecuciones/finalizar` | Finalizar ejecucion | — |
| GET | `/api/ejecuciones` | Listar ejecuciones | `procesoId` (opcional) |
| GET | `/api/ejecuciones/dashboard` | KPIs del dashboard | — |
| GET | `/api/ejecuciones/:id` | Obtener por ID | — |

**CrearEjecucionProcesoDto**:
```typescript
{
  procesoId: string;           // UUID del proceso a ejecutar
  tipoEjecucion?: string;      // "MANUAL" | "PROGRAMADA" | "REINTENTO"
  usuarioSolicita?: string;    // Usuario que inicio la ejecucion
}
```

**Response de Dashboard** — `GET /api/ejecuciones/dashboard`:
```json
{
  "kpis": {
    "totalEjecuciones": 1250,
    "ejecucionesExitosas": 1180,
    "ejecucionesFallidas": 70,
    "porcentajeExito": 94.4,
    "tiempoPromedioMs": 3200
  },
  "ejecucionesPorHora": [
    { "hora": 0, "cantidad": 12 },
    { "hora": 1, "cantidad": 8 },
    { "hora": 6, "cantidad": 45 }
  ],
  "ultimasEjecuciones": [
    {
      "id": "uuid",
      "procesoId": "uuid",
      "nombreProceso": "Carga Ventas Diarias",
      "estado": "EXITOSO",
      "tipoEjecucion": "PROGRAMADA",
      "fechaInicio": "2026-03-04T06:00:00Z",
      "fechaFin": "2026-03-04T06:03:20Z",
      "duracionMs": 200000
    }
  ],
  "procesosConFallasPorDia": [
    {
      "procesoId": "uuid",
      "nombreProceso": "Carga Inventario",
      "cantidadFallos": 3
    }
  ]
}
```

---

### G. Puntos de Venta — `/api/puntos-venta`

Requiere: `Authorization: Bearer {token}`

| Metodo | Endpoint | Descripcion | Query Params |
|--------|----------|-------------|--------------|
| POST | `/api/puntos-venta` | Crear punto de venta | — |
| GET | `/api/puntos-venta` | Listar | `organizacionId` (opcional) |
| GET | `/api/puntos-venta/:id` | Obtener por ID | — |
| PUT | `/api/puntos-venta/:id` | Actualizar | — |
| DELETE | `/api/puntos-venta/:id` | Eliminar | — |

**CrearPuntoVentaDto**:
```typescript
{
  organizacionId: string;   // UUID
  codigoTienda: string;     // Unico. Ej: "T001"
  nombreTienda: string;     // Ej: "Olimpica Barranquilla Norte"
  direccion?: string;
  ciudad?: string;
  pais?: string;
  codigoPostal?: string;
  latitud?: number;
  longitud?: number;
}
```

---

### H. Roles y Permisos — `/api/roles`, `/api/permisos`

Requiere: `Authorization: Bearer {token}`

**Roles**:

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| POST | `/api/roles` | Crear rol |
| GET | `/api/roles` | Listar roles |
| GET | `/api/roles/:id` | Obtener por ID |
| PUT | `/api/roles/:id` | Actualizar |
| DELETE | `/api/roles/:id` | Eliminar |

**Permisos**:

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| POST | `/api/permisos` | Crear permiso |
| GET | `/api/permisos` | Listar permisos |
| GET | `/api/permisos/:id` | Obtener por ID |
| PUT | `/api/permisos/:id` | Actualizar |
| DELETE | `/api/permisos/:id` | Eliminar |

**Asignaciones (muchos a muchos)**:

| Endpoint | Descripcion |
|----------|-------------|
| POST `/api/usuario-rol` | Asignar rol a usuario |
| GET `/api/usuario-rol` | Listar asignaciones |
| DELETE `/api/usuario-rol/:id` | Quitar rol de usuario |
| POST `/api/rol-permiso` | Asignar permiso a rol |
| GET `/api/rol-permiso` | Listar asignaciones |
| DELETE `/api/rol-permiso/:id` | Quitar permiso de rol |

---

### I. Fuentes y Destinos de Datos

Requiere: `Authorization: Bearer {token}`

**Fuentes de Datos** — `/api/fuentes-datos`:

| Metodo | Endpoint | Descripcion | Query Params |
|--------|----------|-------------|--------------|
| POST | `/api/fuentes-datos` | Crear fuente | — |
| GET | `/api/fuentes-datos` | Listar | `organizacionId` (opcional) |
| GET | `/api/fuentes-datos/:id` | Obtener por ID | — |
| PUT | `/api/fuentes-datos/:id` | Actualizar | — |
| DELETE | `/api/fuentes-datos/:id` | Eliminar | — |

**Destinos de Datos** — `/api/destinos-datos`:

Mismos endpoints con prefix `/api/destinos-datos`.

**Ejemplo** de fuente de datos (Amazon Redshift):
```json
{
  "organizacionId": "uuid",
  "codigo": "REDSHIFT-PROD",
  "nombre": "Redshift Produccion",
  "tipoFuenteId": 1,
  "host": "redshift-cluster.us-east-1.redshift.amazonaws.com",
  "puerto": 5439,
  "baseDatos": "scanntech_db",
  "usuario": "etl_user",
  "credencialesEncriptadas": "..."
}
```

---

### J. Mapeo ETL — Columnas y Campos

Requiere: `Authorization: Bearer {token}`

| Endpoint | Descripcion |
|----------|-------------|
| `/api/columnas-origen` | CRUD columnas de la fuente |
| `/api/columnas-destino` | CRUD columnas del destino |
| `/api/mapeos-campo` | CRUD mapeos origen -> destino |
| `/api/dependencias-proceso` | CRUD dependencias entre procesos |

---

### K. Programacion — `/api/programaciones`

Requiere: `Authorization: Bearer {token}`

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| POST | `/api/programaciones` | Crear programacion |
| GET | `/api/programaciones` | Listar |
| GET | `/api/programaciones/:id` | Obtener por ID |
| PUT | `/api/programaciones/:id` | Actualizar |
| DELETE | `/api/programaciones/:id` | Eliminar |

**CrearProgramacionDto**:
```typescript
{
  procesoId: string;           // UUID del proceso a programar
  tipoProgramacionId: number;  // FK a catalogo tipo_programacion
  horaInicio?: string;         // "HH:mm" — Ej: "06:00"
  horaFin?: string;            // "HH:mm"
  diasSemana?: string;         // "1,2,3,4,5" (Lun-Vie)
  diasMes?: string;            // "1,15" (dias del mes)
  cronExpression?: string;     // Cron estandar: "0 6 * * 1-5"
  activo: boolean;
  utc?: string;                // Zona horaria: "America/Bogota"
}
```

---

### L. Configuraciones — SLA y Alertas

Requiere: `Authorization: Bearer {token}`

**SLA** — `/api/configuraciones-sla`:

```typescript
{
  procesoId: string;
  tiempoMaximoMs: number;      // Tiempo maximo de ejecucion en ms
  porcentajeExitoMinimo: number; // Ej: 95 para 95%
  ventanaTiempoHoras: number;  // Ventana de medicion en horas
}
```

**Alertas** — `/api/configuraciones-alerta`:

```typescript
{
  procesoId: string;
  tipoAlertaId: number;
  umbral: number;              // Valor que dispara la alerta
  destinatariosIds: number[];  // IDs de recipientes de correo
  activo: boolean;
}
```

---

### M. Servicios Cloud

Requiere: `Authorization: Bearer {token}`

**Proveedores** — `/api/proveedores-cloud`:

```typescript
{
  nombre: string;     // "AWS", "Azure", "GCP", "Oracle Cloud"
  codigo: string;     // "AWS", "AZURE", "GCP", "OCI"
  descripcion?: string;
}
```

**Servicios** — `/api/servicios-cloud`:

```typescript
{
  proveedorCloudId: number;
  nombreServicio: string;     // "Step Functions", "Lambda", "Glue"
  tipoServicio: string;       // "ORQUESTACION", "COMPUTO", "ETL"
  endpoint?: string;
  parametrosJson?: string;    // Configuracion especifica del servicio
  tokenEncriptado?: string;   // Credenciales de acceso
  permiteInicio: boolean;
  permiteDetener: boolean;
}
```

---

### N. Parametros Globales — `/api/parametros-globales`

Sistema de configuracion multi-tenant con clave compuesta:

| Metodo | Endpoint | Descripcion | Query Params |
|--------|----------|-------------|--------------|
| POST | `/api/parametros-globales` | Crear parametro | — |
| GET | `/api/parametros-globales` | Listar | `organizacionId` |
| GET | `/api/parametros-globales/:id` | Obtener por ID | — |
| PUT | `/api/parametros-globales/:id` | Actualizar | — |
| DELETE | `/api/parametros-globales/:id` | Eliminar | — |

**Estructura del parametro**:
```typescript
{
  organizacionId: string;   // UUID — a que organizacion pertenece
  itemGrupo: string;        // Grupo: "GENERAL", "REINTENTOS", "SCHEDULING"
  itemAtributo: string;     // Atributo: "MAX_REINTENTOS", "TIMEOUT_DEFAULT"
  itemDescripcion: string;  // Descripcion legible
  valorRetornar: string;    // Valor del parametro (string, numero o JSON)
  esDefecto: boolean;       // Si es el valor por defecto
}
```

**Grupos de parametros comunes**:

| Grupo | Atributos |
|-------|-----------|
| `GENERAL` | `TIMEOUT_DEFAULT` |
| `REINTENTOS` | `MAX_REINTENTOS`, `FACTOR_BACKOFF`, `TIEMPO_ESPERA_INICIAL_MS` |
| `LOGGING` | `NIVEL_LOG` |
| `PROCESSING` | `TAMANO_LOTE`, `MAX_LOTES_PARALELOS` |
| `SCHEDULING` | `HORA_INICIO_BATCH`, `HORA_FIN_BATCH` |
| `NOTIFICATIONS` | `EMAIL_ALERTAS`, `WEBHOOK_SLACK` |
| `SLA` | `TIEMPO_RESPUESTA_MS`, `DISPONIBILIDAD_PCT` |
| `DASHBOARD` | `REFRESH` (usado por el scheduler) |

---

### O. Catalogos

Los catalogos son tablas de referencia con CRUD estandar. Todos requieren autenticacion JWT.

| Endpoint | Tabla | Descripcion |
|----------|-------|-------------|
| `/api/tipos-proceso` | `smr_tipo_proceso` | ETL, ELT, REPLICACION, etc. |
| `/api/tipos-dato` | `smr_tipo_dato` | VARCHAR, INTEGER, DATE, JSON, etc. |
| `/api/tipos-fuente` | `smr_tipo_fuente` | REDSHIFT, ORACLE, MYSQL, API, etc. |
| `/api/tipos-destino` | `smr_tipo_destino` | API_REST, S3, FTP, BD, etc. |
| `/api/tipos-alerta` | `smr_tipo_alerta` | EMAIL, SLACK, WEBHOOK, SMS, etc. |
| `/api/tipos-programacion` | `smr_tipo_programacion` | CRON, MANUAL, EVENTO, etc. |
| `/api/status-proceso` | `smr_status_proceso` | INICIADO, EJECUTANDO, EXITOSO, FALLIDO, etc. |
| `/api/niveles-criticidad` | `smr_nivel_criticidad` | CRITICA, ALTA, MEDIA, BAJA |
| `/api/mensajes-error` | `smr_mensaje_error` | Catalogo de errores estandarizados |
| `/api/funciones-sistema` | `smr_funciones_sistema` | Funciones disponibles del sistema |
| `/api/monedas` | `smr_moneda` | COP, USD, EUR, etc. |
| `/api/tasas-cambio` | `smr_tasa_cambio` | Tasas de cambio historicas |
| `/api/calendarios` | `smr_dim_fecha` | Dias festivos y atributos de calendario |
| `/api/recipientes-correo` | `smr_recipiente_correo` | Destinatarios de alertas por correo |

---

### P. Tracking de Ejecuciones

Requiere: `Authorization: Bearer {token}`

**Lotes** — `/api/ejecuciones-lote`:

Tracking granular de cada lote de 350 registros enviado a Scanntech.

```typescript
{
  ejecucionProcesoId: string;     // UUID de la ejecucion padre
  numerolote: number;             // Numero secuencial del lote
  numeroRegistrosLote: number;    // Generalmente 350
  numeroRegistrosExitosos: number;
  numeroRegistrosFallidos: number;
  statusProcesoId: number;        // Estado del lote
  codigoHttp: number;             // Codigo HTTP de respuesta (200, 400, 500)
  duracionMs: number;
  numeroReintento: number;
  fechaIntento: Date;
}
```

**Pasos** — `/api/ejecuciones-paso`:

Tracking por fase del proceso (Extract, Transform, Validate, Load).

**Detalle de Registros Fallidos** — `/api/ejecuciones-detalle-registro`:

Solo se registran los registros que fallaron dentro de un lote:

```typescript
{
  ejecucionLoteId: string;
  puntoVentaId: number;
  fechaTransaccion: Date;        // Fecha de la transaccion original
  ticketId: string;              // ID del ticket de venta
  datosRegistroJson: string;     // JSON completo para reintento
  mensajeError: string;
  codigoError: string;
  fechaIntento: Date;
}
```

---

### Q. Auditoria y Logs

Requiere: `Authorization: Bearer {token}`

| Endpoint | Descripcion |
|----------|-------------|
| `GET /api/logs-proceso` | Logs detallados de ejecuciones |
| `GET /api/logs-cloud` | Logs de invocaciones a servicios cloud |
| `GET /api/incidencias-error` | Incidencias registradas con severidad |
| `GET /api/alertas-enviadas` | Historial de alertas enviadas |
| `GET /api/reintentos-ejecucion` | Historial de reintentos por backoff exponencial |

---

## 9. Entidades y Modelos de Datos

### Usuario — smr_dim_usuario

```typescript
@Entity('smr_dim_usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organizacion_id', nullable: true })
  organizacionId: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;              // bcrypt hash

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ name: 'apellido', nullable: true })
  apellido: string;

  @Column({ name: 'activo', default: 'S' })
  activo: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;
}
```

### Organizacion — smr_organizacion

```typescript
@Entity('smr_organizacion')
export class OrganizacionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'codigo_org', unique: true })
  codigoOrg: string;

  @Column({ name: 'nombre_org' })
  nombreOrg: string;

  @Column({ name: 'razon_social' })
  razonSocial: string;

  @Column({ name: 'nit', unique: true })
  nit: string;

  @Column({ name: 'pais', nullable: true })
  pais: string;

  @Column({ name: 'ciudad', nullable: true })
  ciudad: string;

  @Column({ name: 'pertenece_a', nullable: true })
  perteneceA: number;               // Jerarquia de organizaciones

  @Column({ name: 'activo', default: 'S' })
  activo: string;
}
```

### Proceso — smr_proceso

```typescript
@Entity('smr_proceso')
export class ProcesoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organizacion_id' })
  organizacionId: string;

  @Column({ name: 'tipo_proceso_id' })
  tipoProcesoId: number;

  @Column({ name: 'nivel_criticidad_id' })
  nivelCriticidadId: number;

  @Column({ name: 'codigo', unique: true, length: 50 })
  codigo: string;

  @Column({ name: 'nombre', length: 255 })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'version', length: 50, nullable: true })
  version: string;

  @Column({ name: 'id_workflow_cloud', nullable: true })
  idWorkflowCloud: string;          // ARN de Step Function, ID de Glue Job, etc.

  @Column({ name: 'workflow_secret', nullable: true })
  workflowSecret: string;           // Credenciales encriptadas

  @Column({ name: 'parametros_json', type: 'text', nullable: true })
  parametrosJson: string;

  @Column({ name: 'servicio_cloud_id', nullable: true })
  servicioCloudId: number;

  @Column({ name: 'es_proceso_inicial', default: 'N' })
  esProcesoInicial: string;

  @Column({ name: 'destino_id', nullable: true })
  destinoId: number;

  @Column({ name: 'fuente_id', nullable: true })
  fuenteId: number;

  @Column({ name: 'activo', default: 'S' })
  activo: string;
}
```

### Ejecucion Proceso — smr_ejecucion_proceso

```typescript
@Entity('smr_ejecucion_proceso')
export class EjecucionProcesoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'proceso_id' })
  procesoId: string;

  @Column({ name: 'status_proceso_id' })
  statusProcesoId: number;

  @Column({ name: 'tipo_ejecucion', default: 'MANUAL' })
  tipoEjecucion: string;           // MANUAL | PROGRAMADA | REINTENTO

  @Column({ name: 'usuario_solicita', nullable: true })
  usuarioSolicita: string;

  @Column({ name: 'fecha_inicio', nullable: true })
  fechaInicio: Date;

  @Column({ name: 'fecha_fin', nullable: true })
  fechaFin: Date;

  @Column({ name: 'duracion_ms', nullable: true })
  duracionMs: number;

  @Column({ name: 'numero_registros_procesados', default: 0 })
  numeroRegistrosProcesados: number;

  @Column({ name: 'numero_registros_fallidos', default: 0 })
  numeroRegistrosFallidos: number;

  @Column({ name: 'activo', default: 'S' })
  activo: string;
}
```

### Ejecucion Lote — smr_ejecucion_lote

```typescript
@Entity('smr_ejecucion_lote')
export class EjecucionLoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'ejecucion_proceso_id' })
  ejecucionProcesoId: string;

  @Column({ name: 'numero_lote' })
  numeroLote: number;

  @Column({ name: 'numero_registros_lote', default: 350 })
  numeroRegistrosLote: number;

  @Column({ name: 'numero_registros_exitosos', default: 0 })
  numeroRegistrosExitosos: number;

  @Column({ name: 'numero_registros_fallidos', default: 0 })
  numeroRegistrosFallidos: number;

  @Column({ name: 'status_proceso_id' })
  statusProcesoId: number;

  @Column({ name: 'codigo_http', nullable: true })
  codigoHttp: number;              // Respuesta HTTP de la API Scanntech

  @Column({ name: 'duracion_ms', nullable: true })
  duracionMs: number;

  @Column({ name: 'numero_reintento', default: 0 })
  numeroReintento: number;

  @Column({ name: 'fecha_intento' })
  fechaIntento: Date;
}
```

---

## 10. Patron de Diseno por Modulo

### Ejemplo Completo: Modulo Usuario

**usuario.controller.ts**:
```typescript
@Controller('usuarios')
@UseGuards(JwtAuthGuard)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async crear(@Body() dto: CrearUsuarioDto) {
    return this.usuarioService.crear(dto);
  }

  @Get()
  async listar() {
    return this.usuarioService.listar();
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() dto: ActualizarUsuarioDto,
  ) {
    return this.usuarioService.actualizar(id, dto);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return this.usuarioService.eliminar(id);
  }
}
```

**usuario.service.ts**:
```typescript
@Injectable()
export class UsuarioService {
  constructor(
    private readonly crearUseCase: CrearUsuarioUseCase,
    private readonly listarUseCase: ListarUsuariosUseCase,
    private readonly actualizarUseCase: ActualizarUsuarioUseCase,
    private readonly eliminarUseCase: EliminarUsuarioUseCase,
  ) {}

  async crear(dto: CrearUsuarioDto) {
    return this.crearUseCase.execute(dto);
  }

  async listar() {
    return this.listarUseCase.execute();
  }

  async actualizar(id: string, dto: ActualizarUsuarioDto) {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string) {
    return this.eliminarUseCase.execute(id);
  }
}
```

**crear-usuario.use-case.ts**:
```typescript
@Injectable()
export class CrearUsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(dto: CrearUsuarioDto): Promise<UsuarioResponse> {
    // 1. Verificar que el email no exista
    const existente = await this.usuarioRepository.buscarPorEmail(dto.email);
    if (existente) {
      throw new ConflictException('El email ya esta registrado');
    }

    // 2. Encriptar contrasena
    const passwordHash = await bcrypt.hash(dto.password, 10);

    // 3. Crear entidad
    const usuario = await this.usuarioRepository.crear({
      ...dto,
      passwordHash,
    });

    // 4. Mapear y retornar (sin el hash)
    return UsuarioMapper.toResponse(usuario);
  }
}
```

**usuario.repository.ts**:
```typescript
@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly repo: Repository<UsuarioEntity>,
  ) {}

  async crear(datos: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
    const usuario = this.repo.create(datos);
    return this.repo.save(usuario);
  }

  async buscarPorEmail(email: string): Promise<UsuarioEntity | null> {
    return this.repo.findOne({ where: { email, activo: 'S' } });
  }

  async listar(): Promise<UsuarioEntity[]> {
    return this.repo.find({ where: { activo: 'S' } });
  }

  async actualizar(id: string, datos: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
    await this.repo.update(id, datos);
    return this.repo.findOne({ where: { id } });
  }

  async eliminar(id: string): Promise<void> {
    // Eliminacion logica: activo = 'N'
    await this.repo.update(id, { activo: 'N' });
  }
}
```

---

## 11. Servicios Especiales

### CorreoService — Google Gmail API

**Archivo**: `src/autenticacion/servicios/correo.service.ts`

Utiliza la Google Gmail API via OAuth2 para enviar correos electronicos.

**Proposito**: Enviar codigos OTP para recuperacion de contrasena.

**Configuracion OAuth2**:
```typescript
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI,  // 'https://developers.google.com/oauthplayground/'
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});
```

**Metodo principal**:
```typescript
async enviarOtp(destinatario: string, otp: string): Promise<void> {
  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL,
      accessToken: accessToken.token,
    },
  });

  await transporter.sendMail({
    from: `"Olimpica ETL" <${process.env.MAIL}>`,
    to: destinatario,
    subject: 'Codigo de verificacion — Scanntech',
    html: `
      <h2>Su codigo de verificacion es:</h2>
      <h1 style="font-size: 48px; color: #1976D2;">${otp}</h1>
      <p>Este codigo expira en 10 minutos.</p>
    `,
  });
}
```

### DashboardScheduler — Job Diario

**Archivo**: `src/dashboard/dashboard.scheduler.ts`

Ejecuta un procedimiento SQL para refrescar las tablas del Data Mart.

```typescript
@Injectable()
export class DashboardScheduler {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  // Ejecuta todos los dias a las 10 AM
  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async refrescarDashboard() {
    // Lee el parametro de configuracion
    const parametro = await this.dataSource.query(
      `SELECT valor_retornar FROM smr_parametros_globales
       WHERE item_grupo = 'DASHBOARD' AND item_atributo = 'REFRESH'`,
    );

    if (parametro?.[0]?.valor_retornar === 'true') {
      // Ejecuta el procedimiento SQL de refresco
      await this.dataSource.query('SELECT smr_dashboard_refresh()');
    }
  }
}
```

El procedimiento SQL esta en: `scripts/smr_dashboard_refresh.sql`

---

## 12. Validacion de DTOs

Todos los DTOs usan **class-validator** para validacion automatica.

### Decoradores Disponibles

```typescript
// Tipos basicos
@IsString()                   // Debe ser string
@IsNumber()                   // Debe ser numero
@IsBoolean()                  // Debe ser booleano
@IsEmail()                    // Formato email valido

// Requerimiento
@IsNotEmpty()                 // No puede estar vacio
@IsOptional()                 // Campo opcional

// UUID
@IsUUID()                     // UUID v4 valido

// Longitud
@MaxLength(255)               // Maximo de caracteres
@MinLength(6)                 // Minimo de caracteres

// Numeros
@Min(0)                       // Valor minimo
@Max(100)                     // Valor maximo
@IsPositive()                 // Numero positivo

// Transformacion
@Type(() => Number)           // Convierte string a numero
@Transform(({ value }) => ...) // Transformacion personalizada
```

### Ejemplo de DTO

```typescript
export class CrearProcesoDto {
  @IsUUID()
  @IsNotEmpty()
  organizacionId: string;

  @IsNumber()
  @IsPositive()
  tipoProcesoId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  codigo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsBoolean()
  @IsOptional()
  esProcesoInicial?: boolean;
}
```

### Validacion Global

En `main.ts` se configura la validacion global que aplica a todos los endpoints:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,            // Elimina automaticamente campos no declarados en DTO
    forbidNonWhitelisted: true, // Lanza 400 si hay campos adicionales no esperados
    transform: true,            // Convierte automaticamente tipos (string -> number, etc.)
  }),
);
```

---

## 13. Respuestas Estandarizadas

### Respuestas de Exito

```typescript
// 200 OK — Operacion exitosa
{
  "data": { /* recurso o array */ },
  "message": "Operacion exitosa"
}

// 201 Created — Recurso creado
{
  "data": { /* recurso creado */ },
  "message": "Recurso creado exitosamente"
}
```

### Respuestas de Error

```typescript
// 400 Bad Request — Validacion de DTO fallida
{
  "statusCode": 400,
  "message": ["email must be an email", "nombre should not be empty"],
  "error": "Bad Request"
}

// 401 Unauthorized — Token invalido o ausente
{
  "statusCode": 401,
  "message": "Unauthorized"
}

// 403 Forbidden — Sin permisos
{
  "statusCode": 403,
  "message": "Forbidden resource"
}

// 404 Not Found — Recurso no encontrado
{
  "statusCode": 404,
  "message": "Proceso con id [uuid] no encontrado",
  "error": "Not Found"
}

// 409 Conflict — Recurso duplicado
{
  "statusCode": 409,
  "message": "El codigo ETL-VENTAS-001 ya esta en uso",
  "error": "Conflict"
}

// 500 Internal Server Error
{
  "statusCode": 500,
  "message": "Error interno del servidor",
  "error": "Internal Server Error"
}
```

### Codigos HTTP Usados

| Codigo | Descripcion | Cuando se usa |
|--------|-------------|---------------|
| 200 | OK | GET, PUT, DELETE exitosos |
| 201 | Created | POST exitoso (recurso creado) |
| 400 | Bad Request | Validacion de DTO fallida |
| 401 | Unauthorized | Token ausente, invalido o expirado |
| 403 | Forbidden | Sin permisos para el recurso |
| 404 | Not Found | Recurso no encontrado |
| 409 | Conflict | Violacion de unicidad (email, codigo, NIT) |
| 500 | Internal Server Error | Error no manejado del servidor |

---

## 14. Data Mart

### Descripcion

El Data Mart de Scanntech es un modelo estrella con 18 tablas para analisis de procesos ETL. Se puebla mediante:
1. Un job diario a las 10 AM (DashboardScheduler).
2. Queries de carga incremental documentadas en el repositorio scanntech.

### Dimensiones (9 tablas)

| Endpoint | Tabla | Descripcion | Cardinalidad |
|----------|-------|-------------|-------------|
| `/api/dm-dim-fecha` | `smr_dim_fecha` | Calendario con festivos Colombia | 3,650+ registros |
| `/api/dm-dim-tiempo` | `smr_dim_tiempo` | Tiempo del dia (hora/minuto) | 1,440 registros |
| `/api/dm-dim-proceso` | `smr_dim_proceso` | Procesos ETL (SCD Tipo 2) | Variable |
| `/api/dm-dim-status` | `smr_dim_status` | Estados de proceso | ~10 registros |
| `/api/dm-dim-punto-venta` | `smr_dim_punto_venta` | Tiendas con jerarquia geografica | Variable |
| `/api/dm-dim-usuario` | `smr_dim_usuario` | Usuarios que ejecutan procesos | Variable |
| `/api/dm-dim-fuente` | `smr_dim_fuente` | Fuentes de datos | Variable |
| `/api/dm-dim-destino` | `smr_dim_destino` | Destinos de datos | Variable |
| `/api/dm-dim-tipo-error` | `smr_dim_tipo_error` | Clasificacion de errores | ~20 registros |

### Hechos (5 tablas)

| Endpoint | Tabla | Descripcion |
|----------|-------|-------------|
| `/api/dm-fact-ejecucion` | `smr_fact_ejecucion` | Metricas de ejecuciones (tabla central) |
| `/api/dm-fact-error` | `smr_fact_error` | Registro de errores |
| `/api/dm-fact-lote` | `smr_fact_lote` | Lotes de 350 registros a Scanntech |
| `/api/dm-fact-sla` | `smr_fact_sla` | Cumplimiento de SLAs |
| `/api/dm-fact-alerta` | `smr_fact_alerta` | Alertas enviadas |

### Agregados (2 tablas)

| Endpoint | Tabla | Descripcion |
|----------|-------|-------------|
| `/api/dm-agg-resumen-diario` | `smr_agg_resumen_diario` | Resumen por proceso y dia |
| `/api/dm-agg-resumen-punto-venta` | `smr_agg_resumen_punto_venta` | Resumen por tienda |

### Nota de Solo Lectura

Las tablas del Data Mart son de **lectura** para los consumidores de la API. Solo el proceso interno de refresco (DashboardScheduler + procedimiento SQL) escribe en ellas.

---

## 15. Despliegue con Docker

### Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci --only=production

# Copiar codigo fuente y compilar
COPY . .
RUN npm run build

EXPOSE 3003

CMD ["node", "dist/main"]
```

**Nota**: A diferencia del frontend, este Dockerfile NO usa multi-stage porque la fase de build es parte del mismo proceso.

### docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: api_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  api:
    build: .
    ports:
      - "3003:3003"
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USERNAME: postgres
      DB_PASSWORD: postgres123
      DB_DATABASE: api_db
      PORT: 3003
      NODE_ENV: production
      JWT_SECRET: your-secret-key-production
      JWT_EXPIRATION: 1d
    restart: unless-stopped

volumes:
  postgres_data:
```

### Comandos de Despliegue

```bash
# Construir y ejecutar todo el stack (API + PostgreSQL)
docker-compose up -d --build

# Ver logs de la API
docker-compose logs -f api

# Ver logs de PostgreSQL
docker-compose logs -f postgres

# Conectarse a la base de datos
docker-compose exec postgres psql -U postgres -d api_db

# Detener
docker-compose down

# Detener y eliminar volumenes (PRECAUCION: borra la BD)
docker-compose down -v
```

### Scripts npm

```bash
npm run start:dev    # Desarrollo con auto-reload (ts-node + watch)
npm run build        # Compilar TypeScript a JavaScript
npm run start:prod   # Ejecutar build compilado
npm run test         # Tests unitarios con Jest
npm run test:e2e     # Tests end-to-end
npm run test:cov     # Coverage de tests
npm run lint         # ESLint con auto-fix
```

---

## 16. Flujos Principales

### Flujo A: Login y Emision de JWT

```
1. POST /api/auth/login
   Body: { "email": "admin@olimpica.com", "password": "admin123" }
                |
2. ValidationPipe valida SignInDto
                |
3. AutenticacionController -> LoginUseCase.execute()
                |
4. LoginUseCase:
   a. Busca usuario por email en smr_dim_usuario
   b. Si no existe -> throw UnauthorizedException
   c. bcrypt.compare(password, usuario.passwordHash)
   d. Si no coincide -> throw UnauthorizedException
   e. JwtService.sign({ sub: id, email, organizacionId })
                |
5. Response 200:
   {
     "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
     "usuario": { "id", "email", "nombre", "organizacionId" }
   }
```

### Flujo B: Peticion Autenticada

```
1. GET /api/procesos
   Header: Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
                |
2. JwtAuthGuard intercepta la peticion
                |
3. JwtStrategy.validate() extrae y verifica el token:
   a. Verifica firma con JWT_SECRET
   b. Verifica que no este expirado
   c. Retorna { userId, email, organizacionId }
                |
4. req.user = { userId, email, organizacionId }
                |
5. ProcesoController.listar() se ejecuta
                |
6. ProcesoService -> ListarProcesosUseCase
                |
7. ProcesoRepository.listar(organizacionId)
   SELECT * FROM smr_proceso WHERE activo = 'S'
                |
8. Response 200: { "data": [ { proceso1 }, { proceso2 } ] }
```

### Flujo C: Crear y Ejecutar Proceso ETL

```
# Paso 1: Crear el proceso
POST /api/procesos
{
  "organizacionId": "uuid-olimpica",
  "tipoProcesoId": 1,
  "nivelCriticidadId": 2,
  "codigo": "ETL-VENTAS-001",
  "nombre": "Carga Ventas Diarias",
  "idWorkflowCloud": "arn:aws:states:us-east-1:123:stateMachine:EtlVentas",
  "servicioCloudId": 1,
  "fuenteId": 1,
  "destinoId": 1
}
-> Response 201: { "data": { "id": "uuid-proceso" } }

# Paso 2: Iniciar ejecucion
POST /api/ejecuciones
{
  "procesoId": "uuid-proceso",
  "tipoEjecucion": "MANUAL",
  "usuarioSolicita": "operador@olimpica.com"
}
-> Inserta smr_ejecucion_proceso con estado INICIADO
-> Opcionalmente invoca AWS Step Function
-> Response 201: { "data": { "id": "uuid-ejecucion" } }

# Paso 3: Registrar progreso (llamado por Step Function o proceso ETL)
POST /api/ejecuciones/eventos
{
  "ejecucionId": "uuid-ejecucion",
  "nuevoStatus": "EJECUTANDO",
  "registrosProcesados": 350,
  "registrosFallidos": 2
}
-> Response 200: OK

# Paso 4: Finalizar ejecucion
POST /api/ejecuciones/finalizar
{
  "ejecucionId": "uuid-ejecucion",
  "statusFinal": "EXITOSO",
  "totalRegistrosProcesados": 1050,
  "totalRegistrosFallidos": 5
}
-> Calcula duracionMs, actualiza smr_ejecucion_proceso
-> Response 200: OK
```

### Flujo D: Recuperacion de Contrasena con OTP

```
# Paso 1: Solicitar OTP
POST /api/auth/olvidar-contrasena
{ "correo": "operador@olimpica.com" }
                |
SolicitarOtpUseCase:
1. Verifica que el correo existe en smr_dim_usuario
2. Genera OTP aleatorio de 4 digitos: "7234"
3. Guarda en smr_otp: { correo, codigo, expira_en: ahora+10min }
4. CorreoService.enviarOtp(correo, otp) -> Gmail API
-> Response 200: { "message": "OTP enviado al correo" }

# Paso 2: Verificar OTP
POST /api/auth/verificar-otp
{ "correo": "operador@olimpica.com", "codigo": "7234" }
                |
VerificarOtpUseCase:
1. Busca OTP no expirado para ese correo
2. Compara codigo
-> Response 200: { "valido": true }

# Paso 3: Actualizar contrasena
POST /api/auth/actualizar-contrasena
{
  "correo": "operador@olimpica.com",
  "codigo": "7234",
  "nuevaContrasena": "nueva_password_123"
}
                |
ActualizarContrasenaUseCase:
1. Verifica OTP nuevamente
2. bcrypt.hash(nuevaContrasena, 10)
3. Actualiza password_hash en smr_dim_usuario
4. Marca OTP como usado/expirado
-> Response 200: { "message": "Contrasena actualizada correctamente" }
```

---

## 17. Variables de Entorno

### Archivo .env

```env
# ─── Base de Datos ────────────────────────────────────
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres123
DB_DATABASE=api_db
# En produccion: DB_SCHEMA=monitor

# ─── Aplicacion ───────────────────────────────────────
PORT=3003
NODE_ENV=development

# ─── JWT ──────────────────────────────────────────────
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRATION=1d

# ─── Email (Google OAuth2) ────────────────────────────
MAIL=tu-correo@gmail.com
CLIENT_ID=xxxx.apps.googleusercontent.com
CLIENT_SECRET=GOCSPX-xxxx
REDIRECT_URI=https://developers.google.com/oauthplayground/
REFRESH_TOKEN=1//xxxx-long-token-here
```

### Descripcion de Variables

| Variable | Descripcion | Ejemplo |
|----------|-------------|---------|
| `DB_HOST` | Host de PostgreSQL | `localhost` |
| `DB_PORT` | Puerto de PostgreSQL | `5432` |
| `DB_USERNAME` | Usuario de la BD | `postgres` |
| `DB_PASSWORD` | Password de la BD | `postgres123` |
| `DB_DATABASE` | Nombre de la base de datos | `api_db` |
| `DB_SCHEMA` | Schema de PostgreSQL | `monitor` |
| `PORT` | Puerto donde escucha la API | `3003` |
| `NODE_ENV` | Entorno de ejecucion | `development` / `production` |
| `JWT_SECRET` | Clave secreta para firmar JWT | String largo y aleatorio |
| `JWT_EXPIRATION` | Duracion del token | `1d`, `8h`, `30m` |
| `MAIL` | Correo Gmail remitente | `etl@olimpica.com` |
| `CLIENT_ID` | Google OAuth2 Client ID | `xxxx.apps.googleusercontent.com` |
| `CLIENT_SECRET` | Google OAuth2 Client Secret | `GOCSPX-xxxx` |
| `REDIRECT_URI` | URI de redireccion OAuth2 | URL de Google Playground |
| `REFRESH_TOKEN` | Google OAuth2 Refresh Token | Token largo de Google |

### Seguridad en Produccion

- `JWT_SECRET`: Debe ser una cadena larga y aleatoria (minimo 32 caracteres). No reutilizar entre entornos.
- `DB_PASSWORD`: Usar una password segura, nunca `postgres123` en produccion.
- `REFRESH_TOKEN`: Rotar periodicamente para mantener acceso a Gmail API.
- El archivo `.env` **nunca debe subirse a git** (esta en `.gitignore`).

---

## 18. Guia de Inicio Rapido

### Requisitos Previos

- Node.js v20 o superior
- npm v10 o superior
- PostgreSQL 15+ (local o Docker)
- Cuenta de Gmail con OAuth2 configurado (para envio de OTP)

### Instalacion y Ejecucion Local

```bash
# 1. Ir al directorio del proyecto
cd C:\Users\Pablo.Perdomo\Desktop\api-olimpica

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Copiar el ejemplo y editar con los valores reales
cp .env.example .env

# 4. Crear la base de datos en PostgreSQL
psql -U postgres -c "CREATE DATABASE api_db;"

# 5. Iniciar en modo desarrollo (con auto-reload)
npm run start:dev
```

La API estara disponible en: **http://localhost:3003/api**
La documentacion Swagger en: **http://localhost:3003/api/docs**

### Despliegue con Docker (Recomendado para Produccion)

```bash
# Levanta PostgreSQL + API juntos
docker-compose up -d --build

# Verificar que esten corriendo
docker-compose ps

# Verificar health de la API
curl http://localhost:3003/api/health
```

### Primeros Pasos tras la Instalacion

```bash
# 1. Crear la primera organizacion
curl -X POST http://localhost:3003/api/organizaciones \
  -H "Content-Type: application/json" \
  -d '{
    "codigoOrg": "OLIMPICA",
    "nombreOrg": "Olimpica S.A.",
    "razonSocial": "Olimpica S.A.",
    "nit": "800123456-7",
    "pais": "Colombia",
    "ciudad": "Barranquilla"
  }'

# 2. Crear el primer usuario administrador
curl -X POST http://localhost:3003/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@olimpica.com",
    "password": "admin123",
    "nombre": "Administrador",
    "apellido": "Olimpica"
  }'

# 3. Hacer login y obtener JWT
curl -X POST http://localhost:3003/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@olimpica.com",
    "password": "admin123"
  }'
# Guardar el accessToken de la respuesta

# 4. Usar el token en las siguientes peticiones
curl http://localhost:3003/api/procesos \
  -H "Authorization: Bearer {accessToken}"
```

### Acceder a Swagger

La documentacion interactiva esta disponible en:

```
http://localhost:3003/api/docs
```

Desde Swagger se puede:
- Explorar todos los endpoints disponibles.
- Ejecutar peticiones directamente desde el navegador.
- Autenticarse con el boton **Authorize** (Bearer Token).
- Ver los schemas de DTOs y respuestas.

---

## Apendice: Relacion con el Frontend (app-olimpica)

La API es consumida por el frontend **app-olimpica** (Next.js, puerto 3000). El frontend accede via:

```
NEXT_PUBLIC_API_URL=http://localhost:3003/api
```

Para mayor detalle del frontend, ver la documentacion en:
`C:\Users\Pablo.Perdomo\Desktop\app-olimpica\docs\app.md`

---

*Documento generado en Marzo 2026. Para actualizaciones contactar al equipo de desarrollo de Olimpica.*
