import S3 from 'aws-sdk/clients/s3';
import Logger from 'bunyan';
import { Config, BucketConfig } from './types';
export declare class ConfigClient {
    config: Config;
    bucketConfig: BucketConfig;
    s3: S3;
    log: Logger;
    constructor(bucketConfig: BucketConfig, log?: Logger);
    refresh: () => Promise<void>;
    get: () => Config;
}
