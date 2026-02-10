import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsService } from 'src/utils/aws.service';
import { CrearMedallonOrquestacionDto } from '../dtos/crear-medallon-orquestacion.dto';

@Injectable()
export class CrearMedallonOrquestacionUseCase {
    constructor(
        private readonly awsService: AwsService,
        private readonly configService: ConfigService,
    ) {}

    async execute(dto: CrearMedallonOrquestacionDto) {
        const region = this.configService.get<string>('AWS_REGION', 'us-east-2');
        const accountId = this.configService.get<string>('AWS_ACCOUNT_ID');

        if (!accountId) {
            throw new BadRequestException(
                'AWS_ACCOUNT_ID no está configurada en las variables de entorno',
            );
        }

        if (!dto.stepFunctionName) {
            throw new BadRequestException(
                'El nombre de la Step Function es requerido',
            );
        }

        const body = {
            "p_ambiente": "dev",
            "p_nombre_bucket": "bucket-olimpica-scantech-dev-smrplata",
            "p_ruta_archivo": "/00-Configuracion",
            "p_nombre_archivo": "configuration.cfg",
            "p_entidad": "ventas",
            "p_fecha_inicio": "2025-01-01T00:00:00",
            "p_fecha_fin": "2026-02-28T23:59:59"
          }

        // Construir el ARN de la Step Function
        // Formato: arn:aws:states:REGION:ACCOUNT_ID:stateMachine:NAME
        const stateMachineArn = `arn:aws:states:${region}:${accountId}:stateMachine:${dto.stepFunctionName}`;

        try {
            const result = await this.awsService.startStepFunctionExecution(
                stateMachineArn,
                body,
            );
            return {
                message: 'Ejecución de Step Function iniciada',
                executionArn: result.executionArn,
                startDate: result.startDate,
                stateMachineArn,
            };
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Error desconocido';
            throw new BadRequestException(
                `Error al iniciar Step Function: ${message}`,
            );
        }
    }
}