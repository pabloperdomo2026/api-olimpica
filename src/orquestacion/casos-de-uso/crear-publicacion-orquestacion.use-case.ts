import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsService } from 'src/utils/aws.service';
import { CrearPublicacionOrquestacionDto } from '../dtos/crear-publicacion-orquestacion.dto';

@Injectable()
export class CrearPublicacionOrquestacionUseCase {
    constructor(
        private readonly awsService: AwsService,
        private readonly configService: ConfigService,
    ) {}

    async execute(dto: CrearPublicacionOrquestacionDto) {
        const region = this.configService.get<string>('AWS_REGION', 'us-east-2');

        // Obtiene el Account ID dinámicamente usando STS
        const accountId = await this.awsService.getAccountId();

        if (!accountId) {
            throw new BadRequestException(
                'No se pudo obtener el AWS Account ID',
            );
        }

        if (!dto.stepFunctionName) {
            throw new BadRequestException(
                'El nombre de la Step Function es requerido',
            );
        }

        // Construir el ARN de la Step Function
        // Formato: arn:aws:states:REGION:ACCOUNT_ID:stateMachine:NAME
        const stateMachineArn = `arn:aws:states:${region}:${accountId}:stateMachine:${dto.stepFunctionName}`;

        const body = {
            "p_ambiente": "dev",
            "p_nombre_bucket": "bucket-olimpica-scantech-dev-smrplata",
            "p_ruta_archivo": "/00-Configuracion",
            "p_nombre_archivo": "configuration.cfg",
            "p_entidad": "ventas",
            "id_local": 1
        }

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
