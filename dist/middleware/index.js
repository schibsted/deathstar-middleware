"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deathstar = void 0;
const validation_1 = require("./validation");
const utils_1 = require("./utils");
const config_1 = require("./config");
class Deathstar {
    constructor(bucketConfig, log) {
        this.simulations = {
            error: async (ctx, cfg) => {
                ctx.status = cfg.status;
            },
            slow: async (ctx, cfg, next) => {
                await utils_1.sleep(cfg.timeout);
                await next();
            },
        };
        this.apply = async (ctx, next, cfg) => {
            if (cfg.type && validation_1.allowedToTamperWithRequest(ctx, cfg)) {
                await this.simulations[cfg.type](ctx, cfg, next);
            }
            else {
                await next();
            }
        };
        this.middleware = async (ctx, next) => {
            await this.apply(ctx, next, this.config.get());
        };
        this.config = new config_1.ConfigClient(bucketConfig, log);
    }
}
exports.Deathstar = Deathstar;
