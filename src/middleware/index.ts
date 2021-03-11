import Logger from 'bunyan';
import { Config, BucketConfig } from './types';
import { allowedToTamperWithRequest } from './validation';
import { sleep } from './utils';
import { ConfigClient } from './config';

export class Deathstar {
  config: ConfigClient;

  constructor(
    bucketConfig: BucketConfig,
    log?: Logger,
  ) {
    this.config = new ConfigClient(bucketConfig, log);
  }

  private simulations: Record<string, any> = {
    error: async (ctx: any, cfg: Config) => {
      ctx.status = cfg.status!;
    },
    slow: async (ctx: any, cfg: Config, next: Function) => {
      await sleep(cfg.timeout!);
      await next();
    },
  };

  apply = async (ctx: any, next: Function, cfg: Config) => {
    if (cfg.type && allowedToTamperWithRequest(ctx, cfg)) {
      await this.simulations[cfg.type as string](ctx, cfg, next);
    } else {
      await next();
    }
  };

  middleware = async (ctx: any, next: Function) => {
    await this.apply(ctx, next, this.config.get());
  };
}
