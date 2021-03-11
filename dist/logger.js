"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = void 0;
const bunyan_1 = __importDefault(require("bunyan"));
function getLogger(name) {
    return bunyan_1.default.createLogger({
        name,
        level: process.env.NODE_ENV === 'test' ? 'fatal' : 'debug',
    });
}
exports.getLogger = getLogger;
