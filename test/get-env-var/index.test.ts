import { getEnvVar } from '../../src/get-env-var';

process.env.MY_ENV_VAR = 'some value';
process.env.MY_INTEGER_ENV_VAR = '9';
process.env.MY_FLOAT_ENV_VAR = '6.62607004';
process.env.MY_TRUTHY_ENV_VAR = 'true';
process.env.MY_FALSY_ENV_VAR = 'false';
delete process.env.MY_MISSING_ENV_VAR;

describe('getEnvVar', () => {
  describe('asString', () => {
    it('throws error if env var is missing', () => {
      expect(() => getEnvVar.asString('MY_MISSING_ENV_VAR')).toThrow(
        new Error(`Environment variable MY_MISSING_ENV_VAR is not set`),
      );
    });
    it('returns default value if env var is missing ', () => {
      expect(getEnvVar.asString('MY_MISSING_ENV_VAR', 'default value')).toEqual(
        'default value',
      );
    });
    it('returns env var as string', () => {
      expect(getEnvVar.asString('MY_ENV_VAR')).toEqual('some value');
      expect(getEnvVar.asString('MY_INTEGER_ENV_VAR')).toEqual('9');
      expect(getEnvVar.asString('MY_FLOAT_ENV_VAR')).toEqual('6.62607004');
      expect(getEnvVar.asString('MY_TRUTHY_ENV_VAR')).toEqual('true');
      expect(getEnvVar.asString('MY_FALSY_ENV_VAR')).toEqual('false');
    });
    it('returns env var as number using a mapper method', () => {
      expect(getEnvVar.asString('MY_ENV_VAR', (x: string) => `#${x}#`)).toEqual(
        '#some value#',
      );
      expect(
        getEnvVar.asString(
          'MY_MISSING_ENV_VAR',
          'some default value',
          (x: string) => `#${x}#`,
        ),
      ).toEqual('some default value');
    });
  });

  describe('asInteger', () => {
    it('throws error if env var is missing', () => {
      expect(() => getEnvVar.asInteger('MY_MISSING_ENV_VAR')).toThrow(
        new Error(`Environment variable MY_MISSING_ENV_VAR is not set`),
      );
    });
    it('returns default value if env var is missing ', () => {
      expect(getEnvVar.asInteger('MY_MISSING_ENV_VAR', 14)).toEqual(14);
    });
    it('returns env var as integer', () => {
      expect(getEnvVar.asInteger('MY_ENV_VAR')).toEqual(NaN);
      expect(getEnvVar.asInteger('MY_INTEGER_ENV_VAR')).toEqual(9);
      expect(getEnvVar.asInteger('MY_FLOAT_ENV_VAR')).toEqual(6);
      expect(getEnvVar.asInteger('MY_TRUTHY_ENV_VAR')).toEqual(NaN);
      expect(getEnvVar.asInteger('MY_FALSY_ENV_VAR')).toEqual(NaN);
    });
    it('returns env var as integer using a mapper method', () => {
      expect(
        getEnvVar.asInteger('MY_INTEGER_ENV_VAR', (x: number) => x * x),
      ).toEqual(81);
      expect(
        getEnvVar.asInteger('MY_MISSING_ENV_VAR', 42, (x: number) => x * x),
      ).toEqual(42);
    });
  });

  describe('asBoolean', () => {
    it('throws error if env var is missing', () => {
      expect(() => getEnvVar.asBoolean('MY_MISSING_ENV_VAR')).toThrow(
        new Error(`Environment variable MY_MISSING_ENV_VAR is not set`),
      );
    });
    it('returns default value if env var is missing ', () => {
      expect(getEnvVar.asBoolean('MY_MISSING_ENV_VAR', false)).toEqual(false);
    });
    it('returns env var as boolean', () => {
      expect(getEnvVar.asBoolean('MY_ENV_VAR')).toEqual(false);
      expect(getEnvVar.asBoolean('MY_INTEGER_ENV_VAR')).toEqual(false);
      expect(getEnvVar.asBoolean('MY_FLOAT_ENV_VAR')).toEqual(false);
      expect(getEnvVar.asBoolean('MY_TRUTHY_ENV_VAR')).toEqual(true);
      expect(getEnvVar.asBoolean('MY_FALSY_ENV_VAR')).toEqual(false);
    });
    it('returns env var as boolean using a mapper method', () => {
      expect(
        getEnvVar.asBoolean('MY_TRUTHY_ENV_VAR', (x: boolean) => !x),
      ).toEqual(false);
      expect(
        getEnvVar.asBoolean('MY_MISSING_ENV_VAR', true, (x: boolean) => !x),
      ).toEqual(true);
    });
  });
});
