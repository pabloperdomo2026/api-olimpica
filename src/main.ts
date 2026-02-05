import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

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

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger docs available at: http://localhost:${port}/api/docs`);
}
bootstrap();
