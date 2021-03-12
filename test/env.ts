export const envs = {
} as Record<string, string>;

Object.keys(envs).forEach((key: string) => {
  process.env[key] = envs[key];
});
