import S3 from 'aws-sdk/clients/s3';
import Logger from 'bunyan';
import { promisify } from 'util';
import { getEnvVar } from '../get-env-var';
import { getLogger } from '../logger';
import { Config, BucketConfig } from './types';

const setIntervalAsync = promisify<Function,number>(setInterval);

export class ConfigClient {
  config: Config;

  bucketConfig: BucketConfig;

  s3: S3;

  log: Logger;

  constructor(bucketConfig: BucketConfig, log?: Logger) {
    this.config = {};
    this.bucketConfig = bucketConfig;
    this.s3 = new S3({
      accessKeyId: bucketConfig.accessKey,
      secretAccessKey: bucketConfig.secretKey,
      region: bucketConfig.region,
    });
    this.log = log || getLogger('deathstar-config-client');
    setIntervalAsync(
      this.refresh,
      getEnvVar.asInteger('DEATHSTAR_REFRESH_INTERVAL', 5000),
    );
  }

  refresh = async () => {
    try {
      const response = await this.s3
        .getObject({
          Bucket: this.bucketConfig.bucket,
          Key: this.bucketConfig.key,
        })
        .promise();
      this.config = JSON.parse(response.Body!.toString());
    } catch (error) {
      this.log.error(`Failed to fetch Deathstar config: ${error}`);
      this.config = {};
    }
  };

  get = (): Config => this.config;
}
