"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigClient = void 0;
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const util_1 = require("util");
const get_env_var_1 = require("../get-env-var");
const logger_1 = require("../logger");
const setIntervalAsync = util_1.promisify(setInterval);
class ConfigClient {
    constructor(bucketConfig, log) {
        this.refresh = async () => {
            try {
                const response = await this.s3
                    .getObject({
                    Bucket: this.bucketConfig.bucket,
                    Key: this.bucketConfig.key,
                })
                    .promise();
                this.config = JSON.parse(response.Body.toString());
            }
            catch (error) {
                this.log.error(`Failed to fetch Deathstar config: ${error}`);
                this.config = {};
            }
        };
        this.get = () => this.config;
        this.config = {};
        this.bucketConfig = bucketConfig;
        this.s3 = new s3_1.default({
            accessKeyId: bucketConfig.accessKey,
            secretAccessKey: bucketConfig.secretKey,
            region: bucketConfig.region,
        });
        this.log = log || logger_1.getLogger('deathstar-config-client');
        setIntervalAsync(this.refresh, get_env_var_1.getEnvVar.asInteger('DEATHSTAR_REFRESH_INTERVAL', 5000));
    }
}
exports.ConfigClient = ConfigClient;
