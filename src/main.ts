import { config } from 'dotenv';
config();

const PG_AUTH_CODES = new Set(['28P01', '28000']);

function isDbAuthError(error: unknown): boolean {
  const code = (error as any)?.code ?? (error as any)?.driverError?.code;
  return PG_AUTH_CODES.has(code);
}

process.on('uncaughtException', (error) => {
  if (isDbAuthError(error)) {
    console.error('[uncaughtException] PostgreSQL auth error — reiniciando proceso para obtener credenciales frescas.', error);
    process.exit(1);
  }
  console.error('[uncaughtException] Error no controlado:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  if (isDbAuthError(reason)) {
    console.error('[unhandledRejection] PostgreSQL auth error — reiniciando proceso para obtener credenciales frescas.', reason);
    process.exit(1);
  }
  console.error('[unhandledRejection] Promesa rechazada sin manejar:', reason);
});

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { resolveDbCredentialsFromSecretsManager } from './database/secrets.resolver';
import { DbAuthErrorFilter } from './database/db-auth-error.filter';

async function bootstrap() {
  if (process.env.ENVIRONMENT === 'PRODUCTION') {
    await resolveDbCredentialsFromSecretsManager();
  }

  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api');

  // Enable CORS
  app.enableCors();

  app.useGlobalFilters(new DbAuthErrorFilter());

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('API Olimpica')
    .setDescription('API REST para la gestion de procesos ETL de Olimpica - Scanntech')
    .setVersion('1.0.0')
    .setContact('Equipo de Desarrollo', 'https://olimpica.com', 'desarrollo@olimpica.com')
    .addBearerAuth()
    .addTag('Autenticacion', 'Login y manejo de sesiones')
    .addTag('Organizaciones', 'Gestion de organizaciones')
    .addTag('Procesos', 'Configuracion de procesos ETL')
    .addTag('Usuarios', 'Gestion de usuarios del sistema')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'API Olimpica - Documentacion',
    customfavIcon: 'https://olimpica.com/favicon.ico',
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = 3003;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger docs available at: http://localhost:${port}/api/docs`);
}
bootstrap();
