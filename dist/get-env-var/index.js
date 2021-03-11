"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVar = void 0;
const compose = (...functions) => (args) => functions.reduceRight((arg, fn) => fn(arg), args);
const resolveDefaultValue = (defaultValue, mappingFunction) => !mappingFunction && typeof defaultValue === 'function'
    ? undefined
    : defaultValue;
const resolveMappingFunction = (defaultValue, mappingFunction) => !mappingFunction && typeof defaultValue === 'function'
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
const getEnvironmentVariable = (name, defaultValue, mappingFunction) => {
    const value = resolveDefaultValue(defaultValue, mappingFunction);
    const mapping = resolveMappingFunction(defaultValue, mappingFunction);
    if (!Object.prototype.hasOwnProperty.call(process.env, name) &&
        defaultValue === undefined) {
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
const callWithGenericFunction = (name, defaultValue = undefined, mappingFunction, genericFunction) => {
    const value = resolveDefaultValue(defaultValue, mappingFunction);
    let mapping = resolveMappingFunction(defaultValue, mappingFunction);
    if (mapping) {
        mapping = compose(mapping, genericFunction);
    }
    else {
        mapping = genericFunction;
    }
    return getEnvironmentVariable(name, value, mapping);
};
const asString = (name, defaultValue, mappingFunction) => callWithGenericFunction(name, defaultValue, mappingFunction, (v) => v);
const asInteger = (name, defaultValue, mappingFunction) => callWithGenericFunction(name, defaultValue, mappingFunction, (v) => parseInt(v, 10));
const asBoolean = (name, defaultValue, mappingFunction) => callWithGenericFunction(name, defaultValue, mappingFunction, (value) => value === 'true');
exports.getEnvVar = {
    asString,
    asInteger,
    asBoolean,
};
