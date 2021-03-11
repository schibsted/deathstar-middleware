import { Config, Header } from './types';

const allowedPath = (ctx: any, cfg: Config) => {
  const whitelisted =
    cfg.whitelisted?.paths === undefined ||
    cfg.whitelisted?.paths?.filter((p: any) => ctx.request.url.startsWith(p))
      .length > 0;
  const blacklisted =
    (cfg.blacklisted?.paths || []).filter((p: any) =>
      ctx.request.url.startsWith(p),
    ).length > 0;
  return whitelisted && !blacklisted;
};

const allowedHeaders = (ctx: any, cfg: Config) => {
  const whitelisted =
    cfg.whitelisted?.headers === undefined ||
    cfg.whitelisted?.headers?.filter(
      (h: Header) => ctx.request.header[h.key.toLowerCase()] === h.value,
    ).length > 0;
  const blacklisted =
    (cfg.blacklisted?.headers || []).filter(
      (h: Header) => ctx.request.header[h.key.toLowerCase()] === h.value,
    ).length > 0;
  return whitelisted && !blacklisted;
};

export const allowedToTamperWithRequest = (ctx: any, cfg: Config) =>
  allowedPath(ctx, cfg) && allowedHeaders(ctx, cfg);
