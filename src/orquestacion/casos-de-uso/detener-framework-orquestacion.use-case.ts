import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsService } from 'src/utils/aws.service';

@Injectable()
export class DetenerFrameworkOrquestacionUseCase {
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
 
        try {
            await this.awsService.stopStepFunctionExecution(
                dto.idWorkflowCloud
            );
            return {
                message: 'Ejecución de Step Function detenida',
                idWorkflowCloud: dto.idWorkflowCloud,
            };
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Error desconocido';
            throw new BadRequestException(
                `Error al detener Step Function: ${message}`,
            );
        }
    }
}
