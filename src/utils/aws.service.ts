import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SFNClient,
  StartExecutionCommand,
  StartExecutionCommandInput,
  StartExecutionCommandOutput,
  StopExecutionCommand,
  StopExecutionCommandInput,
} from '@aws-sdk/client-sfn';
import { STSClient, GetCallerIdentityCommand } from '@aws-sdk/client-sts';

@Injectable()
export class AwsService {
  private readonly sfn: SFNClient;
  private readonly sts: STSClient;
  private readonly region: string;
  private accountId: string | null = null;

  constructor(private readonly configService: ConfigService) {
    this.region = this.configService.get<string>('AWS_REGION', 'us-east-1');

    // Usa el rol de IAM de la instancia EC2 automáticamente si no hay credenciales explícitas
    const awsConfig = {
      region: this.region,
    };

    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_KEY');

    if (accessKeyId && secretAccessKey) {
      // Solo usa credenciales explícitas si están configuradas
      Object.assign(awsConfig, {
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
    }

    this.sfn = new SFNClient(awsConfig);
    this.sts = new STSClient(awsConfig);
  }

  /**
   * Obtiene el AWS Account ID usando STS GetCallerIdentity.
   * Cachea el resultado para evitar múltiples llamadas.
   */
  async getAccountId(): Promise<string> {
    if (this.accountId) {
      return this.accountId;
    }

    const command = new GetCallerIdentityCommand({});
    const response = await this.sts.send(command);
    this.accountId = response.Account ?? '';
    return this.accountId;
  }

  /**
   * Inicia una ejecución de AWS Step Functions.
   * @param stateMachineArn ARN de la state machine (ej: arn:aws:states:us-east-1:123456789:stateMachine:nombre)
   * @param input Objeto que se pasa como input a la ejecución (se serializa a JSON)
   * @returns executionArn y startDate de la ejecución
   */
  async startStepFunctionExecution(
    stateMachineArn: string,
    input: Record<string, unknown>,
  ): Promise<{ executionArn: string; startDate: Date }> {
    const params: StartExecutionCommandInput = {
      stateMachineArn,
      input: JSON.stringify(input),
    };
    const command = new StartExecutionCommand(params);
    const response = await this.sfn.send(command) as StartExecutionCommandOutput;
    return {
      executionArn: response.executionArn ?? '',
      startDate: response.startDate ?? new Date(),
    };
  }

  /**
   * Detiene una ejecución en curso de AWS Step Functions.
   * @param executionArn ARN de la ejecución a detener
   * @param causa Motivo de la detención
   */
  async stopStepFunctionExecution(executionArn: string, causa?: string): Promise<void> {
    const params: StopExecutionCommandInput = {
      executionArn,
      cause: causa ?? 'Detenido manualmente por el usuario',
    };
    const command = new StopExecutionCommand(params);
    await this.sfn.send(command);
  }
}