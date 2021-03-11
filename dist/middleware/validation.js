"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedToTamperWithRequest = void 0;
const allowedPath = (ctx, cfg) => {
    var _a, _b, _c, _d;
    const whitelisted = ((_a = cfg.whitelisted) === null || _a === void 0 ? void 0 : _a.paths) === undefined ||
        ((_c = (_b = cfg.whitelisted) === null || _b === void 0 ? void 0 : _b.paths) === null || _c === void 0 ? void 0 : _c.filter((p) => ctx.request.url.startsWith(p)).length) > 0;
    const blacklisted = (((_d = cfg.blacklisted) === null || _d === void 0 ? void 0 : _d.paths) || []).filter((p) => ctx.request.url.startsWith(p)).length > 0;
    return whitelisted && !blacklisted;
};
const allowedHeaders = (ctx, cfg) => {
    var _a, _b, _c, _d;
    const whitelisted = ((_a = cfg.whitelisted) === null || _a === void 0 ? void 0 : _a.headers) === undefined ||
        ((_c = (_b = cfg.whitelisted) === null || _b === void 0 ? void 0 : _b.headers) === null || _c === void 0 ? void 0 : _c.filter((h) => ctx.request.header[h.key.toLowerCase()] === h.value).length) > 0;
    const blacklisted = (((_d = cfg.blacklisted) === null || _d === void 0 ? void 0 : _d.headers) || []).filter((h) => ctx.request.header[h.key.toLowerCase()] === h.value).length > 0;
    return whitelisted && !blacklisted;
};
const allowedToTamperWithRequest = (ctx, cfg) => allowedPath(ctx, cfg) && allowedHeaders(ctx, cfg);
exports.allowedToTamperWithRequest = allowedToTamperWithRequest;
