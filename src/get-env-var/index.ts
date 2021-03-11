const compose = (...functions: any) => (args: any) =>
  functions.reduceRight((arg: any, fn: any) => fn(arg), args);

const resolveDefaultValue = (defaultValue?: any, mappingFunction?: any) =>
  !mappingFunction && typeof defaultValue === 'function'
    ? undefined
    : defaultValue;

const resolveMappingFunction = (defaultValue?: any, mappingFunction?: any) =>
  !mappingFunction && typeof defaultValue === 'function'
    ? defaultValue
    : mappingFunction;

/**
 * Get environment variable or fall back to default value if not
 * available.
 * Throws an error if variable is not found and no default value
 * is supplied.
 *
 * @param {string} name Name of key to get from process.env
 * @param {*} [defaultValue] Default value
 * @param {function} [mappingFunction] Mapping function to apply to the data
 * read from the environment
 * @return {*}
 */
const getEnvironmentVariable = (
  name: string,
  defaultValue?: any,
  mappingFunction?: any,
) => {
  const value = resolveDefaultValue(defaultValue, mappingFunction);
  const mapping = resolveMappingFunction(defaultValue, mappingFunction);
  if (
    !Object.prototype.hasOwnProperty.call(process.env, name) &&
    defaultValue === undefined
  ) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  if (!Object.prototype.hasOwnProperty.call(process.env, name)) {
    return value;
  }
  if (mapping) {
    return mapping(process.env[name]);
  }
  return process.env[name];
};

const callWithGenericFunction = (
  name: string,
  defaultValue: any | undefined = undefined,
  mappingFunction: any,
  genericFunction: any,
): any => {
  const value = resolveDefaultValue(defaultValue, mappingFunction);
  let mapping = resolveMappingFunction(defaultValue, mappingFunction);
  if (mapping) {
    mapping = compose(mapping, genericFunction);
  } else {
    mapping = genericFunction;
  }
  return getEnvironmentVariable(name, value, mapping);
};

const asString = (
  name: string,
  defaultValue?: any,
  mappingFunction?: any,
): string =>
  callWithGenericFunction(
    name,
    defaultValue,
    mappingFunction,
    (v: string) => v,
  );

const asInteger = (
  name: string,
  defaultValue?: any,
  mappingFunction?: any,
): number =>
  callWithGenericFunction(name, defaultValue, mappingFunction, (v: string) =>
    parseInt(v, 10),
  );

const asBoolean = (
  name: string,
  defaultValue?: any,
  mappingFunction?: any,
): boolean =>
  callWithGenericFunction(
    name,
    defaultValue,
    mappingFunction,
    (value: string) => value === 'true',
  );

export const getEnvVar = {
  asString,
  asInteger,
  asBoolean,
};
