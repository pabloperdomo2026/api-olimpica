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
