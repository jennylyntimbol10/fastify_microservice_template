import * as _ from "lodash";

/**
 * @description Mini function that checks if the loaded property file has the property variable.
 * If no property variable or value, it gets the environment variable counterpart.
 * @param variable 
 * @returns Property Value
 * @author Arthur Thomas M. Roda
 */
function getPropValue(variable: string) {
    const config = require('config');
    const envVar = _.toUpper(variable.split('.').join('_'));

    let result = config.get(variable) || config.util.getEnv(envVar) || process.env[envVar];

    if (typeof result === 'boolean' && _.isNull(result) || _.isUndefined(result)) {
        result = false
    }

    if (typeof result === 'number') {
        return Number(result)
    }

    if (result === '0') {
        result = 0
    }

    return result
}

export {getPropValue}