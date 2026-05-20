import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

interface DbSecret {
  username: string;
  password: string;
}

export async function resolveDbCredentialsFromSecretsManager(): Promise<void> {
  const secretName = process.env.DB_SECRET_NAME;
  const region = process.env.AWS_REGION ?? 'us-east-2';

  if (!secretName) {
    throw new Error(
      'ENVIRONMENT is PRODUCTION but DB_SECRET_NAME is not set.',
    );
  }

  const client = new SecretsManagerClient({ region });
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await client.send(command);

  if (!response.SecretString) {
    throw new Error(`Secret "${secretName}" has no SecretString value.`);
  }

  const secret: DbSecret = JSON.parse(response.SecretString);

  process.env.DB_USERNAME = secret.username;
  process.env.DB_PASSWORD = secret.password;
}
