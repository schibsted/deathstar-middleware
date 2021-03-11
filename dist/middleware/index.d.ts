import Logger from 'bunyan';
import { Config, BucketConfig } from './types';
import { ConfigClient } from './config';
export declare class Deathstar {
    config: ConfigClient;
    constructor(bucketConfig: BucketConfig, log?: Logger);
    private simulations;
    apply: (ctx: any, next: Function, cfg: Config) => Promise<void>;
    middleware: (ctx: any, next: Function) => Promise<void>;
}
