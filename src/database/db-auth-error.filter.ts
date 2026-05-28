import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

const PG_AUTH_CODES = new Set(['28P01', '28000']);

@Catch()
export class DbAuthErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const code = (exception as any)?.code ?? (exception as any)?.driverError?.code;

    if (PG_AUTH_CODES.has(code)) {
      console.error(
        `[DbAuthErrorFilter] PostgreSQL auth error (${code}) — reiniciando proceso para obtener credenciales frescas.`,
      );
      process.exit(1);
    }

    const ctx = host.switchToHttp();
    ctx.getResponse().status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
