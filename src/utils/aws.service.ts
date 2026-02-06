import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SFNClient,
  StartExecutionCommand,
  StartExecutionCommandInput,
} from '@aws-sdk/client-sfn';

@Injectable()
export class AwsService {
  private readonly sfn: SFNClient;
  private readonly region: string;

  constructor(private readonly configService: ConfigService) {
    this.region = this.configService.get<string>('AWS_REGION', 'us-east-1');
    this.sfn = new SFNClient({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY', ''),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY', ''),
      },
    });
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
    const response = await this.sfn.send(command);
    return {
      executionArn: response.executionArn ?? '',
      startDate: response.startDate ?? new Date(),
    };
  }
}