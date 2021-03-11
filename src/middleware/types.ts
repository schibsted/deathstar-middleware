export interface Config {
  type?: string;
  timeout?: number;
  status?: number;
  whitelisted?: TrafficPattern;
  blacklisted?: TrafficPattern;
}

export interface TrafficPattern {
  paths?: string[];
  headers?: Header[];
}

export interface Header {
  key: string;
  value: string;
}

export interface BucketConfig {
  accessKey: string;
  secretKey: string;
  bucket: string;
  region: string;
  key: string;
}
