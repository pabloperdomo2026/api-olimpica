import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsService } from 'src/utils/aws.service';
import { CrearFrameworkOrquestacionDto } from '../dtos/crear-framework-orquestacion.dto';

@Injectable()
export class CrearFrameworkOrquestacionUseCase {
    constructor(
        private readonly awsService: AwsService,
        private readonly configService: ConfigService,
    ) {}

    async execute(dto: any) {
        const region = this.configService.get<string>('AWS_REGION', 'us-east-2');
        const accountId = this.configService.get<string>('AWS_ACCOUNT_ID');
        
        if (!accountId) {
            throw new BadRequestException(
                'AWS_ACCOUNT_ID no está configurada en las variables de entorno',
            );
        }

        // if (!dto.stepFunctionName) {
        //     throw new BadRequestException(
        //         'El nombre de la Step Function es requerido',
        //     );
        // }
 
        try {
            const result = await this.awsService.startStepFunctionExecution(
                dto.idWorkflowCloud,
                dto.body,
            );
            return {
                message: 'Ejecución de Step Function iniciada',
                executionArn: result.executionArn,
                startDate: result.startDate,
                idWorkflowCloud: dto.idWorkflowCloud,
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
